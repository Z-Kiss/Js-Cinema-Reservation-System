const ReservationRepository = require('../models/reservationModel')
const {freeUpSeats} = require('../service/seatService')
const getAllReservation = async (req, res) =>{
    const reservations = await ReservationRepository.findAll()
    return res.status(200).json(reservations)
}

const makeReservation = async (req, res) =>{
    try{
        const seatsId = res.seatsId;
        const email = res.email;
        for( const seatId of seatsId) {
            await ReservationRepository.create({email: email, seatId:seatId})
        }
        scheduleTaskReservationChecking(email, seatsId)
        return res.status(200).send("Seats reserved, you have 2 minute to pay");
    }catch(error){
        console.log(error)
        return res.sendStatus(500)
    }
}

const scheduleTaskReservationChecking = (email, seatsId) =>{
   setTimeout(() => cleanUpReservations(email, seatsId),120000);
}

const cleanUpReservations = async (email, seatsId) =>{
    await deleteNotPaidReservations(email);
    await freeUpSeats(seatsId);
    console.log('Reservation deleted');
}

const deleteNotPaidReservations = async (email) =>{
    await ReservationRepository.destroy({where: {email: email, paid: false}})
}


module.exports = {
    getAllReservation,
    makeReservation
}