const admin = require("../model/admin");
const express = require("express");
const db = require("../db/conn");
const bcrypt = require("bcrypt");
const jtoken = require("jsonwebtoken");
const drivers = require("../model/drivers");
exports.signup = async (req, res,next) => {
    const {
        EmployeeID, FirstName, LastName,
        PhoneNo, Email, Password
    } = req.body;
    //console.log(name);
    //console.log(email);
    if (
        !EmployeeID || !FirstName || !LastName ||
        !PhoneNo || !Email || !Password)
        return res
        .status(422)
        .json({ Error: "email, employee_id or password is missing" });

    try {
        const admcheck = await admin.findOne({ EmployeeID: EmployeeID });
        
        if (admcheck) {
            return res.status(422).json({ Error: "Email already exists" });
        }
        const nuser = new admin({
            EmployeeID, FirstName, LastName,
            PhoneNo, Email, Password
        });
        const registered = await nuser.save();
        if (registered) {
            return res.status(201).json({ message: EmployeeID + " " + Email + " user created" });
        }
        else {
            return res
                .status(418)
                .json({ Error: username + " Something bad happened" });
        }
    } 
    catch (error)
    {
        console.log(error);
        response.status(500).json({ Error: error.message });
    }
}
exports.login= async (req, res,next) => {
    const { EmployeeID, Password } = req.body;
    if (!EmployeeID || !Password) {
        return res.status(400).json({
            Error: "Empty Credentials",
        });
    }
    try {
        let token;
        const admdoc = await admin.findOne({ EmployeeID: req.body.EmployeeID });
        if (admdoc) {
            const passcheck = await bcrypt.compare(req.body.Password, admdoc.Password);
            token = await admdoc.generateAuthToken();
            res.cookie("jwttoken", token, {
                expires: new Date(Date.now() + 2592000000),
                httpOnly: true,
            });

            if (!passcheck) {
                res.status(400).json({
                    Error: "Invalid credential",
                });
            } else {
                 res.status(202).send({ Status: "login successfully", EmployeeID: EmployeeID, tokens: token });
                
            }
        }
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
}
