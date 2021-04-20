module.exports = (app) => {
  const indexRouter = require('../rutes/index')
  const loginRouter = require('../rutes/login')
  const signUpRouter = require('../rutes/signUp')
  const exitRouter = require('../rutes/logOut')
  const followRouter = require('../rutes/go')


  app.use('/', indexRouter)
  app.use('/login', loginRouter)
  app.use('/signUp', signUpRouter)
  app.use('/logOut', exitRouter)
  app.use('/go', followRouter)
}
