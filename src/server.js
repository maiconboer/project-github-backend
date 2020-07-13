const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const methodOverride = require('method-override');

const server = express();
server.use(cors());

server.use(express.urlencoded({ extended: true }));

server.use(bodyParser.json());
server.use(express.static('public'));
server.use(methodOverride("_method"));
server.use(routes);

server.listen(process.env.PORT || 4000);