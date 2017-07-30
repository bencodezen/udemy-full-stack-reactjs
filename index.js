const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./services/passport')
require('./models/User')

mongoose.connect(keys.mongoURI)

const app = express()

require('./routes/authRoutes')(app)

// Configure the port that Express will be listening for
const PORT = process.env.PORT || 5000
app.listen(PORT)
