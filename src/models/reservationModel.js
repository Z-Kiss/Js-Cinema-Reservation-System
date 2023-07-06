const {DataTypes} = require('sequelize')
const sequelize = require('../config/databaseConnection.js')

const ReservationModel = sequelize.define('Reservation', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        seatId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        paid:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        tableName: 'Reservations',
        timestamps: false,
    });

module.exports = ReservationModel