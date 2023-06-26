const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.port || 5000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

//ROUTER FOR TRAFFIC
const toDoRouter = require('./routes/toDoRouter');
app.use('/tasks', toDoRouter);


app.listen(port, () => {
    console.log('Listening on port', port)
});