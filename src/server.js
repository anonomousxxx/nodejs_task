const express = require('express');
require('express-async-errors');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./router/index')

const errorHandler = function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({error: 'Something went very wrong :('});
}
const pageNotFoundHandler = function (req, res) {
    res.status(404).send({error: "Endpoint does not exist dude :("});
}

app.use(bodyParser.json());
app.use('/api', routes);
app.use(errorHandler)
app.use(pageNotFoundHandler)

module.exports = app;