const admin = require("../../model/admin");
const express = require("express");
const db = require("../../db/conn");
const bcrypt = require("bcrypt");
const jtoken = require("jsonwebtoken");
const drivers = require("../../model/admin");
const signup = async (req, res) => {
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
        
        if (adm) {
            return res.status(422).json({ Error: "Email already exists" });
        }
        const nuser = new admin({
            EmployeeID, FirstName, LastName,
            PhoneNo, Email, Password
        });
        const registered = await nuser.save();
        if (registered) {
            return res.status(201).json({ message: EmployeeID + " user created" });
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
const login= async (req, res) => {
    const { EmployeeID, password } = req.body;
    if (!EmployeeID || !password) {
        return res.status(400).json({
            Error: "invalid credentials",
        });
    }
    try {
        let token;
        const admdoc = await admin.findOne({ EmployeeID: EmployeeID });
        if (admdoc) {
            const passcheck = await bcrypt.compare(password, admdoc.password);
            token = await admdoc.generateAuthToken();
            res.cookie("jwttoken", token, {
                expires: new Date(Date.now() + 300000),
                httpOnly: true,
            });

            if (!passcheck) {
                res.status(400).json({
                    Error: "Invalid credential",
                });
            } else {
                await res.send({ Message: "login successfully", EmployeeID: EmployeeID, role_id: admdoc.role_id, tokens: token });
                console.log({ EmployeeID: EmployeeID, tokens: token });
            }
        }
    } catch (err) {
        res.status(500).json({ Error: "Error occurred" });
    }
}
module.exports.signup = signup;
module.exports.login = login;