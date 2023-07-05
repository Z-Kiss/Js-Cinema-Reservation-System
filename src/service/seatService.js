const SeatService = require('../models/seatModel')
const ReservationService = require('../models/reservationModel')

const getAllSeat = async (req, res) => {
    const seats = await SeatService.findAll()
    return res.json(seats);
}

const reserveSeats = async (req, res) => {
    const {seatsId, email} = req.body;

    try {
        for (const seatId of seatsId) {
            let seat = await SeatService.findByPk(seatId)
            seat.status = 'pending';
            await seat.save()
            let reservation = await ReservationService.create({email: email, seatId: seatId})
            console.log(reservation)
            await reservation.save()
        }
        return res.status(200).send('Seats Reserved');
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}
const fillUpDatabaseWithSeats = async (req, res) => {
    const {amountOfRow, amountOfSeatInRow} = req.body;
    for (let i = 0; i < amountOfRow; i++) {
        for (let j = 0; j < amountOfSeatInRow; j++) {
            await SeatService.create({row: i, number: j}).catch((error) => {
                return res.status(500).send(error);
            })
        }
    }
    return res.status(200).send(amountOfSeatInRow * amountOfRow + " seat created");
}


module.exports = {
    getAllSeat,
    reserveSeats,
    fillUpDatabaseWithSeats
}