const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use(routes);

module.exports = app;