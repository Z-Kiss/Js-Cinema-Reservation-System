const SeatModel = require('../models/seatModel')
const ReservationModel = require('../models/reservationModel')
const {MAXIMUM_AMOUNT_OF_SEAT_THAT_USER_CAN_RESERVE} = process.env

const checkSeatStatus = async (req, res, next) =>{
    const {seatsId} = req.body;

    if(!seatsId ){
        return res.status(400).send('No seat Id provided');
    }
    if(seatsId.length > MAXIMUM_AMOUNT_OF_SEAT_THAT_USER_CAN_RESERVE){
        return res.status(400).send('You only can reserve ' + MAXIMUM_AMOUNT_OF_SEAT_THAT_USER_CAN_RESERVE + ' chars');
    }

    const seats = []
    for(const seatId of seatsId){
        let seat = await SeatModel.findByPk(seatId);
        if(seat === null){
            return res.status(400).send('Wring Id provided');
        }
        if(seat.status !== 'free'){
            return res.status(400).send('Seat already reserved');
        }
        seats.push(seat);
    }

    res.seats = seats;
    res.seatsId = seatsId;
    return next();
}

const checkEmail = async (req, res, next) =>{
    const {email} = req.body;

    if(!email){
        return res.status(400).send('No email address provided');
    }
    res.email = email;
    return next()
}

const checkNumberOfReservation = async(req, res, next) =>{
    const email = res.email;
    const {seatsId} = req.body;
    const reservation = await ReservationModel.findAll({where: {email: email}})

    if((reservation.length + seatsId.length) > MAXIMUM_AMOUNT_OF_SEAT_THAT_USER_CAN_RESERVE){
        return res.status(400).send('You only can reserve ' + MAXIMUM_AMOUNT_OF_SEAT_THAT_USER_CAN_RESERVE + ' chars');
    }
    return next()
}

module.exports ={
    checkSeatStatus,
    checkEmail,
    checkNumberOfReservation
}