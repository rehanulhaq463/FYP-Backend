const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookies_parser=require('cookie-parser')
const admin = require("./router/admin/Helpers")
const driver = require("./router/driver/Helpers")
const trips=require("./router/trips/Helpers")

env.config({ path: "config.env" });
require("./db/conn.js");
app.use(cookies_parser())
app.use(cors());
app.use(express.json());
app.use(require("./router/auth"));
const PORT = process.env.port;
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/admin", admin);
app.post("/drivers", driver);
app.listen(PORT, () => {
  console.log("server up at localhost" + " " + PORT);
});
