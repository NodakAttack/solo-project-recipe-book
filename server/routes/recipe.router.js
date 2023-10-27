const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route 
 */
router.get("/", (req, res) => {
  console.log("/recipe GET route");
  console.log("is authenticated?", req.isAuthenticated());

  if (req.isAuthenticated()) {
    console.log("user", req.user);
    const searchTerm = req.query.searchTerm;
    console.log("searchTerm", searchTerm);

    let queryText = `
      WITH matched_recipes AS (
        SELECT
          r."recipeID"
        FROM
          "recipes" r
        WHERE
          r."userID" = $1
          AND (
            r."name" ILIKE $2
            OR EXISTS (SELECT 1 FROM "ingredients" i WHERE i."recipeID" = r."recipeID" AND i."name" ILIKE $2)
            OR EXISTS (SELECT 1 FROM "steps" s WHERE s."recipeID" = r."recipeID" AND s."description" ILIKE $2)
            OR EXISTS (SELECT 1 FROM "notes" n WHERE n."recipeID" = r."recipeID" AND n."description" ILIKE $2)
          )
      )
      SELECT
        r."recipeID",
        r."name" AS "recipeName",
        r."course",
        r."notes" AS "recipeNotes",
        r."rating",
        r."picture" AS "recipePicture",
        r."isFavorite",
        r."isShared",
        array_agg(DISTINCT i."name") AS "ingredients",
        array_agg(DISTINCT s."description") AS "steps",
        array_agg(DISTINCT n."description") AS "notes"
      FROM
        matched_recipes m
      JOIN
        "recipes" r ON m."recipeID" = r."recipeID"
      LEFT JOIN
        "ingredients" i ON r."recipeID" = i."recipeID"
      LEFT JOIN
        "steps" s ON r."recipeID" = s."recipeID"
      LEFT JOIN
        "notes" n ON r."recipeID" = n."recipeID"
      GROUP BY
        r."recipeID", r."name", r."course", r."notes", r."rating", r."picture", r."isFavorite", r."isShared";
    `;

    let queryParams = [req.user.id, `%${searchTerm}%`];

    pool
      .query(queryText, queryParams)
      .then((result) => {
        const recipes = result.rows;
        res.send(recipes);
      })
      .catch((error) => {
        console.log(`error in /get ${queryText}`, error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});


/**
 * POST route template
 */
router.post("/", (req, res) => {
  console.log("/recipe POST route");
  console.log(req.body);

  // req.isAuthenticated() is a function provided by passport. it returns either true or false
  console.log("is authenticated?", req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("user", req.user);

    // Extract data from the request body
    const { name, ingredients, steps, notes } = req.body;

    // Start a transaction to insert the recipe and related details
    pool
      .connect()
      .then((client) => {
        return client
          .query("BEGIN") // Begin a transaction
          .then(() => {
            // Insert the recipe into the "recipes" table
            return client
              .query(
                `INSERT INTO "recipes" ("name", "userID") VALUES ($1, $2) RETURNING "recipeID"`,
                [name, req.user.id]
              )
              .then((result) => {
                const recipeId = result.rows[0].recipeID;

                // Insert ingredients into the "ingredients" table
                const ingredientQueries = ingredients.map((ingredient) => {
                  return client.query(
                    `INSERT INTO "ingredients" ("recipeID", "name") VALUES ($1, $2)`,
                    [recipeId, ingredient]
                  );
                });

                // Insert steps into the "steps" table
                const stepQueries = steps.map((step) => {
                  return client.query(
                    `INSERT INTO "steps" ("recipeID", "description") VALUES ($1, $2)`,
                    [recipeId, step]
                  );
                });

                // Insert notes into the "notes" table
                const noteQueries = notes.map((note) => {
                  return client.query(
                    `INSERT INTO "notes" ("recipeID", "description") VALUES ($1, $2)`,
                    [recipeId, note]
                  );
                });

                // Execute all queries in parallel
                return Promise.all([
                  ...ingredientQueries,
                  ...stepQueries,
                  ...noteQueries,
                ]);
              });
          })
          .then(() => {
            return client.query("COMMIT"); // Commit the transaction
          })
          .catch((error) => {
            console.error("Error in transaction:", error);
            return client.query("ROLLBACK"); // Rollback the transaction in case of an error
          })
          .finally(() => {
            client.release(); // Release the client back to the pool
          });
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});


/**
 * DELETE route template
 */
router.delete('/:id', async (req, res) => { 
  const recipeID = req.params.id;

  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    const client = await pool.connect();

    try {
      // Begin a transaction
      await client.query("BEGIN");

      // Delete related records in other tables
      await client.query('DELETE FROM ingredients WHERE "recipeID" = $1', [recipeID]);
      await client.query('DELETE FROM steps WHERE "recipeID" = $1', [recipeID]);
      await client.query('DELETE FROM notes WHERE "recipeID" = $1', [recipeID]);

      // Delete the recipe in the "recipes" table
      await client.query('DELETE FROM recipes WHERE "recipeID" = $1', [recipeID]);

      // Commit the transaction
      await client.query("COMMIT");
    } catch (error) {
      // Rollback the transaction on error
      await client.query("ROLLBACK");
      console.error("Error deleting recipe:", error);
      res.sendStatus(500); // Internal server error
    } finally {
      // always runs - both after successful try and after a catch
      // put the client connection back in pool
      // This is SUPER IMPORTANT
      client.release();
    }

    res.sendStatus(204); // Recipe deleted successfully
  } else {
    res.sendStatus(401); // Unauthorized
  }
});







module.exports = router;
