const {RESERVATION_TIME_LIMIT} = process.env
const {sequelize} = require('sequelize');
const {seatRepository} = require('../models/seatModel');
const {reservationRepository}  = require('../models/reservationModel');
const payForReservation = async (req, res, next) => {

}

const makeReservation = async (req, res) => {
    const transaction = await sequelize.transaction();
    const seatsIds = res.seatsId;

    try {
        for (const seatId of seatsIds) {

            const seat = await seatRepository.findByPk(seatId, {transaction: transaction});

            if (seat) {
                if (seat.status === "szabad") {
                    seat.status = "foglalt";
                    await seat.save({transaction: transaction});
                } else {
                    throw new Error(`Chair with ID ${seatId} already reserved by someone else.`)
                }

            } else {
                throw new Error(`Chair with ID ${seatId} not found.`)
            }

            const reservation = await reservationRepository.create({seatsIds:seatsIds})
        }
        await transaction.commit();
        console.log('Transaction committed successfully.');
        setTimeout((seatsIds) => cleanUpNotPaidSeats(seatsIds), RESERVATION_TIME_LIMIT)
    } catch (error) {
        transaction.rollback();
        console.log("Transaction failed and rolled back. Reason: ", error)
    }
}

const cleanUpNotPaidSeats = async (seatsIds) => {
    const transaction = await sequelize.transaction();
    try {
        for (const seatId of seatsIds) {
            const seat = await seatRepository.findOne({
                where: {
                    status: "foglalt",
                    seatId: seatId,
                    transaction: transaction
                }
            });
            if (seat) {
                seat.status = "szabad";
                await seat.save({transaction: transaction});
            }
        }
        await transaction.commit();
        console.log(`Chair with IDs ${seatsIds} status changed to szabad.`)
    } catch (error) {
        transaction.rollback();
        console.log("Transaction failed and rolled back. Reason: ", error)
    }
}


module.exports = {
    makeReservation,
    payForReservation
}