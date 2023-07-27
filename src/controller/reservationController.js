const {makeReservation, payForReservation} = require('../service/reservationService')
const {checkSeatStatus, checkAuthentication, checkReservationLimit, checkForEmailAddress} = require('../midlewares/index')
const {reserveSeats, changeSeatsStatusToPaid} = require('../service/seatService')
const sendMail = require('../service/mailService')
const reservationController = (router) =>{
    router.post('/reservation', )
    router.patch('/reservation', )
}

module.exports = reservationController