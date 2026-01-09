const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./src/routes/authRoutes');
const { connectDB } = require('./src/config/db'); 
require('dotenv').config();

app.use(cors());
app.use(express.json());

connectDB();

// --- ADD THIS SECTION ---
// This is a simple GET request for testing
app.get('/', (req, res) => {
    res.send('API is running successfully!');
});
// ------------------------

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});