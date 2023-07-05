const {getAllSeat, fillUpDatabaseWithSeats, reserveSeats} = require('../service/seatService')

const seatController = (router) =>{
    router.get('/seat', getAllSeat);
    router.post('/seat/fill', fillUpDatabaseWithSeats)
    router.patch('/seat', reserveSeats);
}

module.exports = seatController