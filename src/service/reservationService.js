const {RESERVATION_TIME_LIMIT} = process.env
const sequelize = require('../config/databaseConnection');
const seatRepository = require('../models/seatModel');
const payForReservation = async (req, res) => {
    const seatsIds = res.seatsId;
    const transaction = await sequelize.transaction();
    try{
        for (const seatId of seatsIds) {
            const seat = await seatRepository.findByPk(seatId);
            if(seat.status === "foglalt"){
                seat.status = "elkelt";
                await seat.save({transaction: transaction});
            }else{
                throw new Error("Your reservation was deleted, because of timeout");
            }
        }
        await transaction.commit();
    }catch (error){
        await transaction.rollback();
        console.log("Transaction failed and rolled back. Reason: ", error);
    }
    res.clearCookie('RESERVATION');
    return res.status(200).send('Reservation paid');
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
                    throw new Error(`Chair with ID ${seatId} already reserved by someone else.`);
                }
            } else {
                throw new Error(`Chair with ID ${seatId} not found.`);
            }
        }
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        console.log("Transaction failed and rolled back. Reason: ", error);
        return res.status(500).send("Transaction failed, Reason: " + error.message);
    }
    res.cookie('RESERVATION', seatsIds, {domain: 'localhost', expires: new Date(Date.now() + parseInt(RESERVATION_TIME_LIMIT))});
    setTimeout(() => cleanUpNotPaidSeats(seatsIds), RESERVATION_TIME_LIMIT);

    console.log('Transaction committed successfully.');
    return res.status(200).send('Transaction committed successfully.');
}

const cleanUpNotPaidSeats = async (seatsIds) => {
    const transaction = await sequelize.transaction();
    let deleted = false;
    try {
        for (const seatId of seatsIds) {
            const seat = await seatRepository.findByPk(seatId, {transaction: transaction});
            if (seat.status === "foglalt") {
                seat.status = "szabad";
                await seat.save({transaction: transaction});
                deleted = true;
            }
        }
        await transaction.commit();
        if(deleted){
            console.log(`Chair with IDs ${seatsIds} status changed to szabad.`);
        }
            console.log(`Cleanup run but nothing changed.`);
    } catch (error) {
        await transaction.rollback();
        console.log("Transaction failed and rolled back. Reason: ", error);
    }
}

module.exports = {
    makeReservation,
    payForReservation
}