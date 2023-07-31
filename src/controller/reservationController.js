const {makeReservation, payForReservation} = require('../service/reservationService');
const {validateSeatsId,isAbleToReserve,isAbleToPay, validateEmail} = require('../midlewares/index');
const sendMail = require('../service/mailService');

const reservationController = (router) =>{
    router.post('/reservation', validateSeatsId, isAbleToReserve, makeReservation );
    router.patch('/reservation', isAbleToPay, validateEmail, payForReservation, sendMail );
}

module.exports = reservationController;