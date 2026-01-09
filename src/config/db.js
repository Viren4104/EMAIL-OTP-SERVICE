const { Sequelize } = require('sequelize');
require('dotenv').config();

// We pass the individual variables from your .env file here
const sequelize = new Sequelize(
    process.env.DB_NAME,      // Database name
    process.env.DB_USER,      // User
    process.env.DB_PASSWORD,  // Password
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',  // Tells Sequelize we are using Postgres
        port: 5432,           // Standard Postgres port
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Required for Neon
            }
        }
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to Neon Database successfully');
        await sequelize.sync();
    } catch (error) {
        console.error('❌ Database connection failed:', error);
    }
};

module.exports = { sequelize, connectDB };