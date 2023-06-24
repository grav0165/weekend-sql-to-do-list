// Source in express, and router being used
const express = require('express');
const toDoRouter = express.Router();

// Source in pool to talk to database
const pool = require('../modules/pool.js');

//GET router to pull database information
toDoRouter.get('/', (req, res) => {
    let queryText = `SELECT * FROM "weekend-to-do-app" ORDER BY "timestamp" ASC`;
    pool.query(queryText)
    .then((result) => {
        //Requesting row data
        res.send(result.rows)
    }).catch((error) => {
        //Sending error when request fails
        console.log('Error in getting task list', error);
        res.sendStatus(500);
    });
});

//POST router to add additional tasks to database
toDoRouter.post('/', (req, res) => {
    console.log('Inside of posting tasks 🧘‍♀️, info sending: ', req.body);
    let task = req.body.task;
    let timestamp = `CURRENT_TIMESTAMP`
    // Packing information to avoid SQL injection
    const queryText = `INSERT INTO "weekend-to-do-app" (task, timestamp) VALUES ($1, $2)`;
    const queryParams = [task, timestamp];

    // Sending to Server
    pool.query(queryText, queryParams)
    .then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error making query ${queryText}`, error);
        res.sendStatus(500);
    })
})



module.exports = toDoRouter;