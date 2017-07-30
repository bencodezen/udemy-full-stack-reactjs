const express = require('express')
require('./services/passport')

const app = express()

require('./routes/authRoutes')(app)

// Configure the port that Express will be listening for
const PORT = process.env.PORT || 5000
app.listen(PORT)
