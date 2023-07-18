
// require('dotenv').config({ path: __dirname+'\\.env' });

// const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, '../../.env'), debug:true });

// require('dotenv').config({debug: true});

// require('dotenv').config({ path: require('find-config')('.env') })

const {Sequelize} = require('sequelize');




const {MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_HOST} = process.env;
setTimeout(()=>{console.log(process.env.MYSQL_USERNAME)},1000)
const sequelize = new Sequelize( {
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    host: MYSQL_HOST,
    dialect: "mysql",
    logging: false
});

// sequelize.authenticate().then(() => {
//     console.log("Connection established successfully");
// })
//     .catch( error =>{
//         console.error('Unable to connect to the database', error);
//     })

module.exports = sequelize;
