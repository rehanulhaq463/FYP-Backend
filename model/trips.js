const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const servicesschema = new mongoose.Schema({
  TripId: {
    type: String,
    required: true,
  },
  TripIntiator: {
    type: String,
    required: true
  },
  TripLocation: {
    type: String,
    required: true
  },
  TripLoad: {
    type: String,
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
    required: true,
    enum:["Not Assigned", "Started", "Completed"]
  }
});
const trip = mongoose.model("Trips", servicesschema);
module.exports = trip;