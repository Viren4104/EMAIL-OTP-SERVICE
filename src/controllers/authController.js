const { Resend } = require('resend');
// const User = require('../models/userModel'); // specific to your project
// const Otp = require('../models/otpModel');   // specific to your project
require('dotenv').config();

// 1. Initialize Resend with the variable from your .env file
const resend = new Resend(process.env.RESEND_API_KEY);

// Function to generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.login = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const otp = generateOTP();

  try {
    // --- DATABASE LOGIC HERE ---
    // You likely have code here to save the OTP to your database.
    // Example: await Otp.create({ email, otp });
    // Keep your existing database logic!
    // ---------------------------

    // 2. SEND EMAIL USING RESEND (Replaces Nodemailer)
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // MUST use this exact email for free tier
      to: email, // In free tier, this MUST be the email you signed up with
      subject: 'Your Login OTP',
      html: `<p>Your OTP code is: <strong>${otp}</strong></p>`
    });

    if (data.error) {
      console.error("Resend Error:", data.error);
      return res.status(500).json({ error: 'Failed to send email via Resend' });
    }

    console.log('Email sent successfully:', data);
    res.status(200).json({ message: 'OTP sent successfully', otp: otp }); // Removed otp from response in production usually

  } catch (error) {
    console.error('Login Controller Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ... keep your verifyOTP function as it was ...