const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const salt = 12
const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const { login, email, password } = req.body

    const user = await User.create({
      login,
      email,
      password: await bcrypt.hash(password, salt),
      carTrip: []
    });
    req.session.user = user
    res.redirect(`/`)
  } catch (error) {
    next(error)
  }

})

module.exports = router
