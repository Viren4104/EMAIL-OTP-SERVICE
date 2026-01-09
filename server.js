const express = require('express');
const cors = require('cors'); // <--- 1. Import cors
const app = express();
const authRoutes = require('./src/routes/authRoutes');
const { connectDB } = require('./src/config/db'); 
require('dotenv').config();

// 2. Add CORS middleware here
// This must be BEFORE your routes so headers are set correctly
app.use(cors());

app.use(express.json());

// 3. Connect to Database
connectDB();

// 4. Setup Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});