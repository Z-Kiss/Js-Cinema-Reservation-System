const {MAXIMUM_AMOUNT_OF_SEAT_THAT_USER_CAN_RESERVE} = process.env;
const validateSeatsId = (req, res, next) => {
    const {seatsId} = req.body;

    if (!seatsId || seatsId.length === 0) {
        return res.status(400).send('Chair id not provided');
    }
    if (seatsId.length > MAXIMUM_AMOUNT_OF_SEAT_THAT_USER_CAN_RESERVE) {
        return res.status(400).send('Only 2 chair can be reserved');
    }
    res.seatsId = seatsId;
    return next();
}

const validateEmail = (req, res, next) => {
    const {email} = req.body;
    if (!email) {
        return res.status(400).send('Email not provided');
    }
    res.email = email;
    return next();
}
const isAbleToReserve = (req, res, next) => {
    const cookie = req.cookies['RESERVATION'];
    if (cookie){
        return res.status(400).send('You already have a unpaid reservation');
    }
    return next();
}

const isAbleToPay = (req, res, next) => {
    const cookie = req.cookies['RESERVATION'];
    if (!cookie) {
        return res.status(400).send("You don't have reservation to pay");
    }
    res.seatsId = cookie;
    return next();
}


module.exports = {
    validateSeatsId,
    validateEmail,
    isAbleToReserve,
    isAbleToPay,

}