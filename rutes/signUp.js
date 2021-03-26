const express = require('express')
// const { sessionChecker } = require('../middleware/auth')
// const Chenal = require('../models/chenals')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const salt = 12
const router = express.Router()

// router.get('/', async (req,res)=>{
//   res.json('signUp')
// })
router.post('/',async (req,res, next)=>{
        try{
          const {login, email, password} = req.body
         
          const user =  await User.create({
            login,
            email,
            password: await bcrypt.hash(password, salt)
          });
          req.session.user=user
          res.redirect(`/`)
        } catch(error){
          next(error)
        }

      })

module.exports = router
