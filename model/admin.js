const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const serviceproviderscehma = new mongoose.Schema({
  EmployeeID: {
    type: String,
    required: true,
    unique: true
  },
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
  Email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  Password: {
    type: String,
    required: true,
    trim: true,
  },
    tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ]
});

serviceproviderscehma.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
serviceproviderscehma.methods.generateAuthToken = async function () {
  try {
    let tokengen = jwt.sign({ _id: this._id }, process.env.SECRETKEY);
    this.tokens = this.tokens.concat({ token: tokengen });
    await this.save();
    return tokengen;
  } catch (err) {
    console.log(err);
  }
};
const serviceprovider = mongoose.model(
  "SERVICEPROVIDER",
  serviceproviderscehma
);
module.exports = serviceprovider;
