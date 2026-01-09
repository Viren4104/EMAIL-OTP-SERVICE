const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

// 1. LOGIN CONTROLLER (Must use 'exports.login')
exports.login = async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Generate random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Send Email via Resend
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // DO NOT CHANGE THIS yet
      to: email, // Must be YOUR registered email
      subject: 'Your Login OTP',
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`
    });

    if (data.error) {
      console.error("Resend Error:", data.error); // Check Render logs if this happens
      return res.status(500).json({ error: 'Failed to send email' });
    }

    // Success
    res.status(200).json({ message: 'OTP sent successfully', otp: otp });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 2. VERIFY OTP CONTROLLER (Must use 'exports.verifyOTP')
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  // Your verification logic here...
  console.log(`Verifying ${email} with OTP ${otp}`);
  res.status(200).json({ message: 'OTP Verified Successfully' });
};