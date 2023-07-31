const {Sequelize} = require('sequelize');

require('dotenv').config();

const {MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_HOST} = process.env;

const sequelize = new Sequelize( {
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    host: MYSQL_HOST,
    dialect: "mysql",
    logging: false
});

sequelize.authenticate().then(() => {
    console.log("Connection established successfully");
})
    .catch( error =>{
        console.error('Unable to connect to the database', error);
    });

module.exports = sequelize;
