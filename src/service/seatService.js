const SeatRepository = require('../models/seatModel')

const getAllSeat = async (req, res) => {
    const seats = await SeatRepository.findAll()
    return res.json(seats);
}

const reserveSeats = async (req, res, next) => {
    try {
        const seats = res.seats;

        for (const seat of seats) {
            seat.status = "pending";
            await seat.save()
        }
        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}
const fillUpDatabaseWithSeats = async (req, res) => {
    const {amountOfRow, amountOfSeatInRow} = req.body;
    for (let i = 0; i < amountOfRow; i++) {
        for (let j = 0; j < amountOfSeatInRow; j++) {
            await SeatRepository.create({row: i, number: j});
        }
    }
    return res.status(200).send(amountOfSeatInRow * amountOfRow + " seat created");
}

const freeUpSeats = async (seatsId) =>{
    for (const seatId of seatsId) {
        let seat = await SeatRepository.findByPk(seatId);
        seat.status = 'free';
        await seat.save()
    }
}

module.exports = {
    getAllSeat,
    reserveSeats,
    fillUpDatabaseWithSeats,
    freeUpSeats,
}