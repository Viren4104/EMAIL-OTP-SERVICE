const express = require('express');
const app = express();
const authRoutes = require('./src/routes/authRoutes');
const { connectDB } = require('./src/config/db'); // Import connection function
require('dotenv').config();

app.use(express.json());

// 1. Connect to Database
connectDB();

// 2. Setup Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});