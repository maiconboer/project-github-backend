const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()
server.use(cors())
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

server.use(express.urlencoded({ extended: true }))

server.use(bodyParser.json());
server.use(express.static('public'))
server.use(methodOverride("_method"))
server.use(routes)

server.listen(process.env.PORT || 4000)