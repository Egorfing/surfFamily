module.exports = function (app) {
  const express = require('express')
  const morgan = require('morgan')
  const cookieParser = require('cookie-parser')
  const session = require('express-session')
  const path = require('path')
  const FileStore = require('session-file-store')(session)
  const { cookiesCleaner } = require('./auth')
  const dbConnection = require('./bd')
  dbConnection()
  app.use(morgan('dev'))

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use(cookieParser())

  app.use(
    session({
      store: new FileStore(),
      key: 'user_sid',
      secret: 'anything here',
      resave: false,
      saveUninitialized: false,
      cookie: {
        express: 6000000
      }
    })
  )

  app.use(cookiesCleaner)

  app.use(express.static(path.join(__dirname, '..', 'public')))

  app.set('views', path.join(__dirname, '..', 'views'))
  app.set('view engine', 'hbs')
}
