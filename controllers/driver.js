const express = require("express");
const db = require("../db/conn");
const bcrypt = require("bcrypt");
const jtoken = require("jsonwebtoken");
const drivers = require("../model/drivers");
//function to view all the trips assigned to a driver
exports.viewall = async (req, res, next) => {
  const driver = await drivers.find({});
  if (driver.length > 0) return res.status(200).send(driver);
  return res.status(404).send({ message: "No dirver exists" });
};
//function to create a new driver
exports.insertdriver = async (req, res, next) => {
  if (
    !req.body.FirstName ||
    !req.body.LastName ||
    !req.body.PhoneNo ||
    !req.body.CnicNo ||
    !req.body.VehicleNo ||
    !req.body.VehicleType ||
    !req.body.MaxLoad
  ) {
    return res.status(400).send({ message: "Invalid request parameters" });
  }
  const {
    FirstName,
    LastName,
    PhoneNo,
    CnicNo,
    VehicleNo,
    VehicleType,
    MaxLoad,
  } = req.body;
  try {
    const check = await drivers.findOne({ CnicNo: req.body.CnicNo });
    if (check)
      return res.status(200).send({ message: "Driver Already exists" });
    const dv = new drivers({
      FirstName,
      LastName,
      PhoneNo,
      CnicNo,
      VehicleNo,
      VehicleType,
      MaxLoad,
    });
    const resp = await dv.save();
    if (resp) {
      return res.status(200).send({
        message: "Driver successfully created",
      });
    } else {
      res.status(409).send({ message: "Driver creation failed" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
//function for finding a driver by his CnicNo
exports.finddriver = async (req, res, next) => {
  try {
    const doc = await drivers.find({ VehicleType: req.body.VehicleType });
    if (doc.length > 0) return res.status(200).send(doc);
    else
      return res
        .status(200)
        .send({ message: "No driver with this VehicleNo found" });
  } catch (err) {
    return res.status(500).send({ Message: err.message });
  }
};
//fucntion for assinging trips to a driver
exports.assigntrip = async (req, res, next) => {
  
  const {
    TripIds,
    TripIntiators,
    TripLocations,
    TripLoads,
    StartDates,
    EndDates,
    drivercnic,
    Statuss,
    
  } = req.body;
  if (!TripIds||
    !TripIntiators||
    !TripLocations||
    !TripLoads||
    !StartDates||
    !EndDates||
    !Statuss||
    !drivercnic 
    
  )
    return res.status(404).send({ message: "Incomplete request" });
 try {
	 const SD = new Date(StartDates);
	  const ED = new Date(EndDates);
	  const upd = await drivers.findOneAndUpdate(
	    { CnicNo: drivercnic },
	    {
	      $addToSet: {
          Trips: {
              TripIds:req.body.TripIds,
	            TripIntiator: req.body.TripIntiators,
	            TripLocation: req.body.TripLocations,
	            TripLoad: req.body.TripLoads,
	            StartDate: SD,
	            EndDate: ED,
	            Status: req.body.Statuss,
	        },
	      },
	    }
	  );
	  if (upd)
	  {
	    return res.status(200).send({ message: "Trip added successfully" });
	  }
	  else {
	    return res.status(422).send({ message: "Trip could not be added" });
	  }
} catch (error) {
   return res.status(500).send({ message: error.message });
}
};
//function for updating tips status assigned to a driver
exports.updatetrip = async (req, res, next) =>
{
  try {
	const driver = await drivers.findOne({ CnicNo: req.body.CnicNo });
	  if(!driver)
	  {
	    return res.status(404).send({ Status: "Driver Not Found With this CnicNo" });
	  }
	  const Driver = await drivers.updateOne(
	      { CnicNo: req.body.CnicNo },
	      {
	        $set: {
	          "Trips.$[o].userstatus": req.body.Status,
	        },
	      },
	      {
	        arrayFilters: [
	          {
	            "o.TripId": req.body.TripId,
	          },
	        ],
	      }
	  );
	  if (Driver)
	    return res.status(200).send({ Status: `The Trip With TripId ${req.body.TripId} has been updated` });
	  else
	    return res.status(501).send({Status: `The Trip With TripId ${req.body.TripId}could not be updated` });
} catch (error) {
    return res.status(500).send({ Status: error.message });
}
  }
