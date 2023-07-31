const SeatRepository = require('../models/seatModel')
const getAllSeat = async (req, res) => {
    const seats = await SeatRepository.findAll()
    return res.json(seats);
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


const deleteAllSeats = async () =>{
    await SeatRepository.destroy({
        where: {},
        truncate: true
    })
}

module.exports = {
    getAllSeat,
    fillUpDatabaseWithSeats,


}