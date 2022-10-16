const path = require('path');

const express = require('express');

const adminController = require('../../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/login', adminController.login);

// /admin/products => GET
router.post('/signup', adminController.signup);

// /admin/add-product => POST


module.exports = router;
