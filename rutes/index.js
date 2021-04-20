const express = require('express')
const session = require('express-session')
const Day = require('../models/waveDay')
const Car = require('../models/Car')


const router = express.Router()

router.get('/', async (req, res) => {
  let sesion = 0
  if (req.session.user) {
    sesion = 1
  }
  const days = await Day.find();
  const dayCars = []
  for (let i = 0; i < days.length; i++) {
    if (days[i].cars.length) {
      const currDay = await Day.findOne({ day: days[i].day }).populate('cars');
      const date = days[i].day
      const day = { date: date, cars: currDay.cars }
      dayCars.push(day);
    }

  }


  res.render('index', { sesion, dayCars })
})


module.exports = router
