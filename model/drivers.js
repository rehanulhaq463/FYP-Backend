const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const userschema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  PhoneNo: {
    type: String,
    required: true,
  },
  CnicNo: {
    type: String,
    required: true,
    unique: true,
  },
  VehicleNo: {
    type: String,
    required: true,
  },
  VehicleType: {
    type: String,
    required: true,
  },
  MaxLoad: {
    type: String,
    required: true,
  },
  Trips: [
    {
      TripId: {
        type: String,
        required: true,
      },
      TripIntiator: {
        type: String,
        required: true,
      },
      TripLocation: {
        type: String,
        required: true,
      },
      TripLoad: {
        type: String,
        required: true,
      },
      StartDate: {
        type: Date,
        required: true,
      },
      EndDate: {
        type: Date,
        required: true,
      },
      Status: {
        type: String,
        default: "Not Assigned",
        required: true,
      },
    },
  ],
});

const driver = mongoose.model("Drivers", userschema);
module.exports = driver;
