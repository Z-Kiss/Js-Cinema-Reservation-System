const ReservationRepository = require('../models/reservationModel')
const {freeUpSeats} = require('../service/seatService')
const {RESERVATION_TIME_LIMIT} = process.env
const getAllReservation = async (req, res) =>{
    const reservations = await ReservationRepository.findAll()
    return res.status(200).json(reservations)
}

const payForReservation = async (req, res, next) =>{

    const name = res.name;
    const reservations = await ReservationRepository.findAll({where: {name: name}})
    if(!reservations){
        return res.status(400).send('You dont have reservations, try reserve again');
    }
    const seatsId = [];
    for(const reservation of reservations){
        let seatId = reservation.seatId;
        seatsId.push(seatId);
        reservation.paid = true;
        await reservation.save();
    }
    res.seatsId = seatsId;
    return next();
}

const makeReservation = async (req, res) =>{
    try{
        const seatsId = res.seatsId;
        const name = res.name;
        for( const seatId of seatsId) {
            await ReservationRepository.create({name: name, seatId:seatId});
        }
        scheduleTaskReservationChecking(name, seatsId);
        return res.status(200).send("Seats reserved, you have 2 minute to pay");
    }catch(error){
        console.log(error);
        return res.sendStatus(500);
    }
}

const scheduleTaskReservationChecking = (name, seatsId) =>{
    setTimeout(() => cleanUpReservations(name, seatsId),RESERVATION_TIME_LIMIT);
}

const cleanUpReservations = async (name, seatsId) =>{
    await deleteNotPaidReservations(name);
    await freeUpSeats(seatsId);
}

const deleteNotPaidReservations = async (name) =>{
    await ReservationRepository.destroy({where: {name: name, paid: false}});
    console.log('Not paid reservations deleted');
}


module.exports = {
    getAllReservation,
    makeReservation,
    payForReservation
}