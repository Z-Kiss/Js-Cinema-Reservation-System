const {getAllReservation, makeReservation, payForReservation} = require('../service/reservationService');
const {checkSeatStatus, checkAuthentication, checkReservationLimit, checkForEmailAddress} = require('../midlewares/index');
const {reserveSeats, changeSeatsStatusToPaid} = require('../service/seatService');
const sendMail = require('../service/mailService');
const reservationController = (router) =>{
    router.get('/reservation', getAllReservation);
    router.post('/reservation', checkAuthentication, checkReservationLimit, checkSeatStatus, reserveSeats, makeReservation);
    router.patch('/reservation', checkAuthentication, checkForEmailAddress, payForReservation, changeSeatsStatusToPaid, sendMail);
}

module.exports = reservationController;