const express   = require("express");
const db        = require("../db/conn");
const bcrypt    = require("bcrypt");
const jtoken    = require("jsonwebtoken");
const trips     = require("../model/trips");
exports.createtrip = async (req, res, next) => {
  
  
	const { TripId,TripIntiator, TripLocation, TripLoad, StartDate, EndDate, Status } =
		req.body;
	if (!TripId||!TripIntiator || !TripLocation || !TripLoad || !StartDate || !EndDate)
		return res.status(404).send({ message: "Incomplete request" });
	const SD = new Date(StartDate);
	const ED=new Date(EndDate);
  try {
	const trip = new trips({
		TripId,
		TripIntiator,
		TripLocation,
		TripLoad,
		StartDate:SD,
		EndDate:ED,
		Status,
	});
	  const resp = await trip.save();
	  if (resp)
	  {
		  return res.status(200).send({ message: "Trip created successfully" });
	  }
	  else {
		  return res.status(200).send({ message: "Trip did not save" });
	  }
} catch (error) {
	return res.status(500).send({ message: error.message });
}
};
exports.viewtrips = async (req, res, next) => { 
	try {
		const trip = await trips.find({ Status: "Completed" });
		const una = await trips.find({ Status: "Not Assigned" });
		const start =await trips.find({ Status: "Started" });
	if (trip) {
		return res.status(200).send({Completed:trip, Unassigned:una, Started:start});
	}
	else {
		return res.status(404).send({ message: "No completed trips found" });
	}
} catch (error) {
	return res.status(500).send({ message: error.message });
}
}

