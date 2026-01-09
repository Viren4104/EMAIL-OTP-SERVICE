const express = require('express');
const router = express.Router();

// Import the functions we just created
// IMPORTANT: The names inside { } must match exports.login and exports.verifyOTP
const { login, verifyOTP } = require('../controllers/authController'); 

// Route 1: Login
router.post('/login', login); 

// Route 2: Verify OTP
router.post('/verify-otp', verifyOTP);

module.exports = router;