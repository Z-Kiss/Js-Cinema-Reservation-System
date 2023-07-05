const reservationService = require('../models/reservationModel')
const getAllReservation = async (req, res) =>{
    const reservations = await reservationService.findAll()
    return res.status(200).json(reservations)
}

module.exports = {
    getAllReservation
}