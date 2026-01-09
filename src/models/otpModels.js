const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Make sure this points to your db config

const OtpModel = sequelize.define('OtpRecord', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true }
    },
    otp_code: {
        type: DataTypes.STRING(6),
        allowNull: false
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'otp_records'
});

module.exports = OtpModel;