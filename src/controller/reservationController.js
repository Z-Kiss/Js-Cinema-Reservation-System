const {getAllReservation, makeReservation} = require('../service/reservationService')
const {checkSeatStatus, checkEmail, checkNumberOfReservation} = require('../midlewares/index')
const {reserveSeats} = require('../service/seatService')
const reservationController = (router) =>{
    router.get('/reservation', getAllReservation)
    router.post('/reservation', checkEmail, checkNumberOfReservation, checkSeatStatus, reserveSeats, makeReservation)
}

module.exports = reservationController