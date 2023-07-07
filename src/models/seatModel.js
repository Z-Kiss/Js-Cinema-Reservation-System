const {DataTypes} = require('sequelize');
const sequelize = require('../config/databaseConnection.js');

const SeatModel = sequelize.define('Seat', {
        row: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: ['szabad', 'foglalt', 'elkelt'],
            defaultValue: 'szabad',
        },
    },
    {
        tableName: 'Seats',
        timestamps: false
    });

module.exports = SeatModel;