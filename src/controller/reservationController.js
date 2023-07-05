const {getAllReservation} = require('../service/reservationService')

const reservationController = (router) =>{
    router.get('/reservation', getAllReservation)
}

module.exports = reservationController