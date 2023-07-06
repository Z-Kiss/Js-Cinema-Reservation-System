const SeatRepository = require('../models/seatModel')

const getAllSeat = async (req, res) => {
    const seats = await SeatRepository.findAll()
    return res.json(seats);
}

const reserveSeats = async (req, res, next) => {
    try {
        const seats = res.seats;

        for (const seat of seats) {
            seat.status = "foglalt";
            await seat.save()
        }
        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}
const fillUpDatabaseWithSeats = async (req, res) => {
    await deleteAllSeats();
    const {amountOfRow, amountOfSeatInRow} = req.body;
    for (let i = 0; i < amountOfRow; i++) {
        for (let j = 0; j < amountOfSeatInRow; j++) {
            await SeatRepository.create({row: i, number: j});
        }
    }
    return res.status(200).send(amountOfSeatInRow * amountOfRow + " seat created");
}

const freeUpSeats = async (seatsId) => {
    for (const seatId of seatsId) {
        let seat = await SeatRepository.findByPk(seatId);
        seat.status = 'szabad';
        await seat.save()
    }
}

const changeSeatsStatusToPaid = async (req, res, next) => {

    const seatsId = res.seatsId;
    for (const seatId of seatsId) {
        let seat = await SeatRepository.findByPk(seatId);
        seat.status = 'elkelt';
        await seat.save();
    }
    return next();
}

const populateDatabase = async (req, res) => {
    await deleteAllSeats();
    await SeatRepository.create({row: 0, number: 0})
    await SeatRepository.create({row: 1, number: 0})
    return res.sendStatus(200);
}

const deleteAllSeats = async () =>{
    await SeatRepository.destroy({
        where: {},
        truncate: true
    })
}

module.exports = {
    getAllSeat,
    reserveSeats,
    fillUpDatabaseWithSeats,
    freeUpSeats,
    changeSeatsStatusToPaid,
    populateDatabase

}