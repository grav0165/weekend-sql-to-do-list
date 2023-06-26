const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

//ROUTER FOR TRAFFIC
const toDoRouter = require('./routes/toDoRouter');
app.use('/tasks', toDoRouter);


app.listen(PORT, () => {
    console.log('Listening on port', PORT)
});