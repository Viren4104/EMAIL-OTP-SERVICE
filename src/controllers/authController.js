const OtpModel = require('../models/otpModels');
const { sendOtpEmail } = require('../utils/emailService');
const { Op } = require('sequelize'); // Special operators for queries

// --- 1. SEND OTP ---
exports.sendOtp = async (req, res) => {
    const { email } = req.body;

    // Generate random 6-digit number
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiration (5 minutes from now)
    const expiresAt = new Date(Date.now() + 5 * 60000);

    try {
        // 1. Send Email
        const emailSent = await sendOtpEmail(email, otp);
        if (!emailSent) {
            return res.status(500).json({ error: 'Failed to send email' });
        }

        // 2. Save to Database using Sequelize
        // We assume the email is valid since the email service worked
        await OtpModel.create({
            email: email,
            otp_code: otp,
            expires_at: expiresAt
        });

        res.status(200).json({ message: 'OTP sent successfully' });

    } catch (error) {
        console.error('Error in sendOtp:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// --- 2. VERIFY OTP ---
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Find the LATEST record for this email
        const record = await OtpModel.findOne({
            where: { email: email },
            order: [['createdAt', 'DESC']] // Sort by newest first
        });

        // Check if record exists
        if (!record) {
            return res.status(400).json({ error: 'Invalid OTP or Email' });
        }

        // Check if OTP matches
        if (record.otp_code !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        // Check if expired
        // "expires_at" is stored as a Date object by Sequelize
        if (new Date() > record.expires_at) {
            return res.status(400).json({ error: 'OTP has expired' });
        }

        // OTP is valid!
        // OPTIONAL: Delete the used OTP so it cannot be used again
        await record.destroy();

        res.status(200).json({ 
            message: 'Login Successful!', 
            token: "fake-jwt-token-here" 
        });

    } catch (error) {
        console.error('Error in verifyOtp:', error);
        res.status(500).json({ error: 'Server error' });
    }
};  