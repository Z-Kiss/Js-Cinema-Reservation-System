const {DataTypes} = require('sequelize')
const sequelize = require('../config/databaseConnection.js')

const ReservationModel = sequelize.define('Reservation', {
        seatsId:{
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        }
    },
    {
        tableName: 'Reservations',
        timestamps: false
    });

module.exports = ReservationModel