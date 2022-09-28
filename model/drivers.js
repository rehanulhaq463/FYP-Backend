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
      provider_email: {
        type: String,
      },
      user_email: {
        type: String,
      },
      date: {
        type: Date,
      },  
      userstatus: {
        type: String,
        default: "pending",
      },
      providerstatus: {
        type: String,
        default: "pending",
      },
      totalbill: {
        type: Number,
        default: 0,
      },
      instruction: {
        type: String,
      },
    },
  ],
});

const User = mongoose.model("USER", userschema);
module.exports = User;