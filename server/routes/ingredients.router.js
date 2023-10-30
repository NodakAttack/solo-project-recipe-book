const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:recipeID", (req, res) => {
  if (req.isAuthenticated()) {
    const recipeID = req.params.recipeID;

    let queryText = `
      SELECT i."ingredientID", i."name" as "ingredientName"
      FROM "ingredients" i
      WHERE i."recipeID" = $1;
    `;

    let queryParams = [recipeID];

    pool
      .query(queryText, queryParams)
      .then((result) => {
        const ingredients = result.rows;
        res.json(ingredients);
      })
      .catch((error) => {
        console.error(`Error in GET /ingredients/${recipeID}:`, error);
        res.status(500).json({ message: 'Internal server error' });
      });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Add Ingredient
router.post("/:recipeID", (req, res) => {
  if (req.isAuthenticated()) {
    const recipeID = req.params.recipeID;
    const { ingredientName } = req.body;

    let queryText = `
      INSERT INTO "ingredients" ("recipeID", "name")
      VALUES ($1, $2)
      RETURNING "ingredientID";
    `;

    let queryParams = [recipeID, ingredientName];

    pool
      .query(queryText, queryParams)
      .then((result) => {
        res.status(201).json({ ingredientID: result.rows[0].ingredientID });
      })
      .catch((error) => {
        console.error(`Error in POST /ingredients/${recipeID}:`, error);
        res.status(500).json({ message: 'Internal server error' });
      });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Delete Ingredient
router.delete("/:recipeID/:ingredientID", (req, res) => {
  if (req.isAuthenticated()) {
    const recipeID = req.params.recipeID;
    const ingredientID = req.params.ingredientID;

    let queryText = `
      DELETE FROM "ingredients"
      WHERE "recipeID" = $1 AND "ingredientID" = $2;
    `;

    let queryParams = [recipeID, ingredientID];

    pool
      .query(queryText, queryParams)
      .then(() => {
        res.sendStatus(204); // No content - successful deletion
      })
      .catch((error) => {
        console.error(`Error in DELETE /ingredients/${recipeID}/${ingredientID}:`, error);
        res.status(500).json({ message: 'Internal server error' });
      });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;
