const {DataTypes} = require('sequelize')
const sequelize = require('../config/databaseConnection.js')

const ReservationModel = sequelize.define('Reservation', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        seatId: {
            type: DataTypes.CHAR(36),
            allowNull: false
        },
        paid:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        tableName: 'Reservations',
        updatedAt: false,
    });

module.exports = ReservationModel