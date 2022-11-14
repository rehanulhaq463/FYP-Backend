const path = require('path');

const express = require('express');

const driverController = require('../../controllers/driver');

const router = express.Router();

router.post("/insertdriver", driverController.insertdriver);
router.get("/viewdrivers", driverController.viewall);
router.get("/finddrivers", driverController.finddriver)
router.patch("/assigntrip", driverController.assigntrip);
router.patch("/updatetrips", driverController.updatetrip);
module.exports=router