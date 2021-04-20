const router = require('express').Router();
const Day = require('../models/waveDay')
const Car = require('../models/Car')
const User = require('../models/user')


router.post('/', async (req, res) => {
  const { dayNow, carSeat, time, location } = req.body
  const userId = req.session.user._id
  const car = await Car.create({
    seat: carSeat,
    free: carSeat,
    time,
    location,
    driver: userId,
    passenger: []
  })

  const day = await Day.findOne({ day: dayNow })
  const id = car._id;
  console.log(day.cars);
  day.cars.push(id)
  console.log(day.cars);
  day.save()
  res.redirect('/')
})

router.post('/day', async (req, res) => {
  const { dayNow } = req.body
  let answer = false
  if (req.session.user) {
    const day = await Day.findOne({ day: dayNow })
    if (!day) {
      await Day.create({
        day: dayNow,
        cars: []
      })
    }
    answer = true
  }
  res.json(answer)
})

router.post('/pass', async (req, res) => {
  const { id } = req.body
  if (req.session.user) {
    const userId = req.session.user._id
    const user = await User.findOne({ _id: userId })
    user.carTrip.push(id)
    const car = await Car.findOne({ _id: id })
    let freeSeat = car.free
    console.log(freeSeat);
    freeSeat -= 1
    car.free = freeSeat
    console.log(freeSeat);
    car.save()
  }
  res.redirect('/')
})
module.exports = router;
