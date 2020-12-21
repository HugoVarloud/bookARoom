const express = require('express')
const app = express()
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

app.use(bodyParser.json())
app.use(cors())

// Import Routes
const roomRoute = require('./routes/rooms')
app.use('/rooms', roomRoute)

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Book a Room App')
});

// Database Connect
mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to the Database');
        }
    })

// Server
app.listen(3000, () => {
    console.log('Server started on 3000')
})