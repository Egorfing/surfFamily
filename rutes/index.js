const express = require('express')
const session = require('express-session')
const Day = require('../models/waveDay')
const Car = require('../models/Car')


const router = express.Router()

router.get('/', async (req, res)=>{
  let sesion = 0
  if(req.session.user){
    sesion = 1
  }
// const day = await Day.findOne({day: "2021-03-28"}).populate('cars');
const days = await Day.find();
// days.forEach(async (el) => await el.populate('cars'));
console.log(days);
// days[1].populate('cars');
// console.log('hhhhhhh',days[1]);
const dayCars = []
for (let i = 0; i < days.length; i++) {
  if(days[i].cars.length){
    const currDay = await Day.findOne({day: days[i].day}).populate('cars');
    // console.log('!!!!!!!!', i, currDay);
    // dayCars.push(currDay.cars);
    // const currCars = days[i].populate('cars');
    // console.log('!!!!!!!!',currCars);
    // let cars = days[i].cars
    const date = days[i].day
    const day = {date: date,cars: currDay.cars}
    dayCars.push(day);
  }
  
}

console.log(dayCars);

  res.render('index',{sesion, dayCars})
})


module.exports = router
