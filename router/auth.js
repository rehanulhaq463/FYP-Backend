const express = require("express");
const db = require("../db/conn.js");
const bcrypt = require("bcrypt");
const jtoken = require("jsonwebtoken");
const admin = require("../model/admin");
const trips = require("../model/trips");
const drivers = require("../model/drivers");
const helperadm=require('./admin/Helpers')
const authenticate = require("../middleware/authenticate");

const router = express.Router();

module.exports = router;
