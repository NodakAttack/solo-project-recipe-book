const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  console.log("/recipe GET route");
  console.log("is authenticated?", req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("user", req.user);
    let queryText = `SELECT
    r."recipeID",
    r."name" AS "recipeName",
    r."course",
    r."notes" AS "recipeNotes",
    r."rating",
    r."picture" AS "recipePicture",
    r."isFavorite",
    r."isShared",
    i."name" AS "ingredientName",
    i."quantity",
    i."unit",
    s."description" AS "stepDescription",
    s."order" AS "stepOrder",
    n."description" AS "noteDescription"
FROM
    "recipes" r
LEFT JOIN
    "ingredients" i ON r."recipeID" = i."recipeID"
LEFT JOIN
    "steps" s ON r."recipeID" = s."recipeID"
LEFT JOIN
    "notes" n ON r."recipeID" = n."recipeID"
WHERE
    r."userID" = $1;`;
    // authorization
    let queryParams = [req.user.id];
    // if(req.user.access_level > 0) {
    //     // admins can see all recipes. TODO
    //     queryText = `SELECT * FROM "recipes";`;
    //     queryParams = [];
    // }
    pool
      .query(queryText, queryParams)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(error);
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

module.exports = router;
