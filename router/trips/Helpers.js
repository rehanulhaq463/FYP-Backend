const path = require('path');

const express = require('express');

const tripController = require('../../controllers/trips');

const router = express.Router();

router.post("/createtrip", tripController.createtrip);

router.get("/viewtrips", tripController.viewtrips)

module.exports=router