const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  carTrip: [{
    type: mongoose.Schema.Types.Object,
    ref: "Car",
  }]

});

module.exports = mongoose.model('User', userSchema);
