const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:recipeID", (req, res) => {
  if (req.isAuthenticated()) {
    const recipeID = req.params.recipeID;

    let queryText = `
      SELECT s."stepID", s."description" as "stepDescription"
      FROM "steps" s
      WHERE s."recipeID" = $1
      ORDER BY s."stepID" ASC;
    `;

    let queryParams = [recipeID];

    pool
      .query(queryText, queryParams)
      .then((result) => {
        const steps = result.rows;
        res.json(steps);
      })
      .catch((error) => {
        console.error(`Error in GET /steps/${recipeID}:`, error);
        res.status(500).json({ message: 'Internal server error' });
      });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Add Step
router.post("/:recipeID", (req, res) => {
  if (req.isAuthenticated()) {
    const recipeID = req.params.recipeID;
    const { stepDescription } = req.body;

    let queryText = `
      INSERT INTO "steps" ("recipeID", "description")
      VALUES ($1, $2)
      RETURNING "stepID";
    `;

    let queryParams = [recipeID, stepDescription];

    pool
      .query(queryText, queryParams)
      .then((result) => {
        res.status(201).json({ stepID: result.rows[0].stepID });
      })
      .catch((error) => {
        console.error(`Error in POST /steps/${recipeID}:`, error);
        res.status(500).json({ message: 'Internal server error' });
      });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Delete Step
router.delete("/:recipeID/:stepID", (req, res) => {
  if (req.isAuthenticated()) {
    const recipeID = req.params.recipeID;
    const stepID = req.params.stepID;

    let queryText = `
      DELETE FROM "steps"
      WHERE "recipeID" = $1 AND "stepID" = $2;
    `;

    let queryParams = [recipeID, stepID];

    pool
      .query(queryText, queryParams)
      .then(() => {
        res.sendStatus(204); // No content - successful deletion
      })
      .catch((error) => {
        console.error(`Error in DELETE /steps/${recipeID}/${stepID}:`, error);
        res.status(500).json({ message: 'Internal server error' });
      });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Edit Step
router.put("/:recipeID/:stepID", (req, res) => {
  if (req.isAuthenticated()) {
    const recipeID = req.params.recipeID;
    const stepID = req.params.stepID;
    const { stepDescription } = req.body;

    let queryText = `
      UPDATE "steps"
      SET "description" = $1
      WHERE "recipeID" = $2 AND "stepID" = $3
    `;

    let queryParams = [stepDescription, recipeID, stepID];

    pool
      .query(queryText, queryParams)
      .then(() => {
        res.sendStatus(204); // No content - successful update
      })
      .catch((error) => {
        console.error(`Error in PUT /steps/${recipeID}/${stepID}:`, error);
        res.status(500).json({ message: 'Internal server error' });
      });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;
