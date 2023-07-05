const {DataTypes} = require('sequelize')
const sequelize = require('../config/database_connection.js')

const SeatModel = sequelize.define('Seat', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
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
            values: ['free', 'pending', 'reserved'],
            defaultValue: 'free',
        },
    },
    {
        tableName: 'Seats',
        timestamps: false
    });

module.exports = SeatModel