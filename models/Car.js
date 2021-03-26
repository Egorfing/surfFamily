const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    seat: Number,
    time: String,
    location: String,
    driver: {
      type: mongoose.Schema.Types.Object,
      ref: "User",
  }
});

module.exports = mongoose.model('Car', carSchema);
