const {login, logout} = require('../service/authService');
const {populateDatabase} = require('../service/seatService');
const authController = (router) =>{
    router.post('/auth', login, populateDatabase);
    router.get('/auth', logout);
}

module.exports = authController;