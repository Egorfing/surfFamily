const app = require('./app')
const mongoose = require('mongoose')

const port = process.env.PORT || 3000
app.listen(
  port,
  ()=>{
    console.log(`Srver on port ${port}`)})

