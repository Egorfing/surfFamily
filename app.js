const express = require('express')
const useMiddleware = require('./middleware/index')
const routeHandler = require('./middleware/routing')
// const errorHandler = require('./middleware/errorHandler')


const app = express()

useMiddleware(app)

routeHandler(app)
// errorHandler(app)
module.exports = app
