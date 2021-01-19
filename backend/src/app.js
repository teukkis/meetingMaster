const express = require('express')
require('./db/connectDB')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')

// Create a connection to the db
require('./db/connectDB')
require('./auth')

// A couple of useful middlewares
app.use(helmet())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

// Routers used in this API
const accountRouter = require('./routes/account')
const eventsRouter = require('./routes/events')
const eventListRouter = require('./routes/eventList')
const eventByIdRouter = require('./routes/eventById')

// Apply the routers
app.use('/account', accountRouter)
app.use('/api/v1/event/list', eventListRouter)
app.use('/api/v1/event/:id', eventByIdRouter)
app.use('/api/v1/event', eventsRouter)


module.exports = app
