const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const router = require('./controller/index');
const http = require('http');
const sequelize = require('./config/databaseConnection');
const cookieParser = require("cookie-parser");
const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

// // expand express.respond
app.response.seatsId = [];
app.response.seats = [];
app.response.name = null;
app.response.email = null;

const server = http.createServer(app);

// sequelize.sync({force: true}).then(() => {
//     console.log('All models are synchronized successfully');
// }).catch(error => {
//     console.error('Error occurred during model synchronization', error);
// })



server.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
})

app.use("/", router());
