const express = require('express');
const seatController = require('./seatController');
const reservationController = require('./reservationController');
const authController = require('./authController');
const router = express.Router();

module.exports =(() => {
    seatController(router);
    reservationController(router);
    authController(router);
    return router;
});