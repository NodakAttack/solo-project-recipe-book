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

module.exports = router;