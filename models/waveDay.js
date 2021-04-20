const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  day: { type: String, required: true },
  cars: [{
    type: mongoose.Schema.Types.Object,
    ref: "Car",
  }]
});

module.exports = mongoose.model('Day', daySchema);
