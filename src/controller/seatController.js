const {getAllSeat, fillUpDatabaseWithSeats} = require('../service/seatService');
const {checkAuthentication} = require('../midlewares/index');
const seatController = (router) =>{

    router.get('/seat', getAllSeat);
    router.post('/seat',checkAuthentication, fillUpDatabaseWithSeats);
}

module.exports = seatController;