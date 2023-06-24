// Source in express, and router being used
const express = require('express');
const toDoRouter = express.Router();

// Source in pool to talk to database
const pool = require('../modules/pool.js');

//GET router to pull database information
toDoRouter.get('/', (req, res) => {
    let queryText = `SELECT * FROM "weekend-to-do-app" ORDER BY "timestamp" ASC;`;
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
    // Packing information to avoid SQL injection
    const queryText = `INSERT INTO "weekend-to-do-app" ("task", "timestamp") VALUES ($1, CURRENT_TIMESTAMP)`;
    const queryParams = [task];

    // Sending to Server
    pool.query(queryText, queryParams)
    .then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error making query ${queryText}`, error);
        res.sendStatus(500);
    })
})

// DELETE router to remove task from database
toDoRouter.delete('/:id', (req, res) => {
    console.log('Inside of deleting a task ❌');
    // This grabs the ID of the row selected to delete
    let idToDelete = req.params.id;
    // queryText sending request to database to delete record
    let queryText = `DELETE FROM "weekend-to-do-app" WHERE id = $1;`;

    //Sending delete request to server
    pool.query(queryText, [idToDelete])
    .then((results) => {
        // console log to confirm being deleted
        console.log('Task deleted!');
        // Sending OK status that request was accepted
        res.sendStatus(200);
    })
    .catch((error) => {
        // Console log in case of error to diagnose 
        console.log('Error making database query', error);
        // Sending response to client of error status
        res.sendStatus(500);
    })
})

// PUT 
toDoRouter.put('/:id', (req, res) => {
    console.log('Inside of completing a task ✅')
    const queryParams = [req.params.id, req.body.newCompleted];
    console.log('Querey params sent over: ', queryParams)
    let query = `UPDATE "weekend-to-do-app" SET "completed"=$2 WHERE "id"=$1`
    pool.query(query, queryParams)
    .then(result => {
        res.sendStatus(200);
    })
    .catch(error => {
        console.log('Error in updating task ', error);
        res.sendStatus(500)
    })
})



module.exports = toDoRouter;