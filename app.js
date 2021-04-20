const express = require('express')
const useMiddleware = require('./middleware/index')
const routeHandler = require('./middleware/routing')

const app = express()

useMiddleware(app)

routeHandler(app)
module.exports = app
