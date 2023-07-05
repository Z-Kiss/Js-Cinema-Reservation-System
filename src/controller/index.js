const express = require('express')
const seatController = require('./seatController')
const reservationController = require('./reservationController')
const router = express.Router();

module.exports =(() => {
    seatController(router)
    reservationController(router)
    return router;
});