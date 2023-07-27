const {RESERVATION_TIME_LIMIT} = process.env
const {sequelize} = require('sequelize')
const {seatRepository} = require('../models/seatModel')
const payForReservation = async (req, res, next) =>{

}

const makeReservation = async (req, res) =>{
    const transaction = await sequelize.transaction();
    const seatsIds = res.seatsId;

    try{
        for (const seatId of seatsIds) {

            const seat = await seatRepository.findOne({ where: {status: "szabad", seatId:seatId, transaction: transaction }});

            if (seat) {
                seat.status = "foglalt";
                await seat.save({ transaction: transaction });
            } else {
                throw new Error(`Chair with ID ${seatId} not found.`)
            }
        }

        await transaction.commit();

        console.log('Transaction committed successfully.');
    }catch (error){
        transaction.rollback();
        console.log("Transaction failed and rolled back. Reason: ",error)
    }
}




module.exports = {
    makeReservation,
    payForReservation
}