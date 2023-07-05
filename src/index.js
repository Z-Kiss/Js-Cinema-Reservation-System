const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const http = require('http')
const sequelize = require('./config/database_connection')
const app = express();

app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);

sequelize.sync({force: false}).then(() => {
    console.log('All models are synchronized successfully')
}).catch(error =>{
    console.error('Error occurred during model synchronization', error)
})

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080')
})





