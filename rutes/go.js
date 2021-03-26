const router = require('express').Router();
const Day = require('../models/waveDay')
const Car = require('../models/Car')

router.post('/',async (req,res)=>{
  const {dayNow, carSeat, time, location} = req.body
  const userId = req.session.user._id
  const car = await Car.create({
    seat: carSeat,
    time,
    location,
    driver: userId
  })
  // console.log(dayNow);
  const day = await Day.findOne({day:dayNow})
  const id = car._id;
    console.log(day.cars);
  day.cars.push(id)
  console.log(day.cars);
  day.save()
  res.redirect('/')
} )

router.post('/day',async (req, res)=>{
  const {dayNow} = req.body
  let answer = false
if(req.session.user){
  const day = await Day.findOne({day:dayNow})
  if(!day){
    await Day.create({
      day: dayNow,
      cars: []
    })
  }
  answer = true
}
res.json(answer)
})

module.exports = router;
