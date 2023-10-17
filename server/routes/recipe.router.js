const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  console.log("/pet GET route");
  console.log("is authenticated?", req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("user", req.user);
    let queryText = `SELECT * FROM "recipes" WHERE "id" = $1;`;
    // authorization
    let queryParams = [req.user.id];
    if(req.user.access_level > 0) {
        // admins can see all pets
        queryText = `SELECT * FROM "recipes";`;
        queryParams = [];
    }
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
      // add the pet to our database
      let queryText = `INSERT INTO "recipes" ("name", "id")
                      VALUES ($1, $2);`;
  
      // ! req.user.id is the currently logged in user id
      // always use req.user.id for current user
      pool
        .query(queryText, [req.body.name, req.user.id])
        .then((results) => {
          res.sendStatus(201);
        })
        .catch((error) => {
          console.log(error);
          res.sendStatus(500);
        });
    } else {
      res.sendStatus(401);
    }
  });
module.exports = router;
