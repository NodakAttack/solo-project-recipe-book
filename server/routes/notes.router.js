const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:recipeID", (req, res) => {
  if (req.isAuthenticated()) {
    const recipeID = req.params.recipeID;

    let queryText = `
      SELECT n."noteID", n."description" as "noteDescription"
      FROM "notes" n
      WHERE n."recipeID" = $1;
    `;

    let queryParams = [recipeID];

    pool
      .query(queryText, queryParams)
      .then((result) => {
        const notes = result.rows;
        res.json(notes);
      })
      .catch((error) => {
        console.error(`Error in GET /notes/${recipeID}:`, error);
        res.status(500).json({ message: 'Internal server error' });
      });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Add Note
router.post("/:recipeID", (req, res) => {
  if (req.isAuthenticated()) {
    const recipeID = req.params.recipeID;
    const { noteDescription } = req.body;

    let queryText = `
      INSERT INTO "notes" ("recipeID", "description")
      VALUES ($1, $2)
      RETURNING "noteID";
    `;

    let queryParams = [recipeID, noteDescription];

    pool
      .query(queryText, queryParams)
      .then((result) => {
        res.status(201).json({ noteID: result.rows[0].noteID });
      })
      .catch((error) => {
        console.error(`Error in POST /notes/${recipeID}:`, error);
        res.status(500).json({ message: 'Internal server error' });
      });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Delete Note
router.delete("/:recipeID/:noteID", (req, res) => {
  if (req.isAuthenticated()) {
    const recipeID = req.params.recipeID;
    const noteID = req.params.noteID;

    let queryText = `
      DELETE FROM "notes"
      WHERE "recipeID" = $1 AND "noteID" = $2;
    `;

    let queryParams = [recipeID, noteID];

    pool
      .query(queryText, queryParams)
      .then(() => {
        res.sendStatus(204); // No content - successful deletion
      })
      .catch((error) => {
        console.error(`Error in DELETE /notes/${recipeID}/${noteID}:`, error);
        res.status(500).json({ message: 'Internal server error' });
      });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;
