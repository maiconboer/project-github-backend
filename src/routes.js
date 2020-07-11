const express = require('express')
const routes = express.Router()
const starredRepositories = require('./controllers/starredRepositories')

routes.get('/starred-repositories', starredRepositories.index)
routes.get('/starred-repositories/:filter/:id', starredRepositories.findby)
routes.post('/starred-repositories', starredRepositories.post)
routes.get('/starred-repositories/:id', starredRepositories.show)
routes.put('/starred-repositories', starredRepositories.put)
routes.delete('/starred-repositories/:id', starredRepositories.delete)

module.exports = routes