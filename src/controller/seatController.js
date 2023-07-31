const {getAllSeat, fillUpDatabaseWithSeats} = require('../service/seatService');

const seatController = (router) =>{
    router.get('/seat', getAllSeat);
    router.post('/seat', fillUpDatabaseWithSeats);
}

module.exports = seatController;