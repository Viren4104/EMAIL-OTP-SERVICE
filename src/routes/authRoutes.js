const express = require('express');
const router = express.Router();

// Import must match the names 'login' and 'verifyOTP'
const { login, verifyOTP } = require('../controllers/authController'); 

// Check if functions are loaded correctly (Debug)
if (!login || !verifyOTP) {
    console.error("Error: Controller functions are undefined. Check authController.js exports.");
}

router.post('/login', login); 
router.post('/verify-otp', verifyOTP);

module.exports = router;