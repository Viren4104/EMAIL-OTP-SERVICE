const { Resend } = require('resend');
const { Pool } = require('pg'); // Assuming you use pg, or keep your db logic
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper to generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// 1. LOGIN CONTROLLER
exports.login = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const otp = generateOTP();

  try {
    // TODO: Save 'otp' and 'email' to your database here!
    // await db.query('INSERT INTO otps (email, otp) VALUES ($1, $2)', [email, otp]);

    // Send Email via Resend
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email, 
      subject: 'Your Login OTP',
      html: `<p>Your OTP code is: <strong>${otp}</strong></p>`
    });

    if (data.error) {
      console.error("Resend Error:", data.error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 2. VERIFY OTP CONTROLLER (Added back in case it was missing)
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  // Add your verification logic here
  console.log(`Verifying: ${email} with ${otp}`);
  res.status(200).json({ message: 'OTP Verified (Logic pending)' });
};