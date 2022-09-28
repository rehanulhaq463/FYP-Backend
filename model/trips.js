const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const servicesschema = new mongoose.Schema({
  TripIntiator:{
    type: String,
    required: true
  },
  TripLocation: {
    type: String,
    required: true
  },
  TripLoad: {
    type: Number,
    required: true
  },
  StartDate: {
    type: Date,
    required: true
  },
  EndDate: {
    type: Date,
    required: true
  },
  Status: {
    type: String,
    default:"Not Assigned",
    required: true
  }
});
const admin = mongoose.model("ADMIN", servicesschema);
module.exports = admin;