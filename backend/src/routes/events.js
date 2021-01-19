const eventsRouter = require('express').Router()
const mongoose = require('mongoose')
const Event = require('../db/models/event')
const logger = require('../logger')

// requests for /api/v1/event
eventsRouter.post('/', async (req, res, next) => {
  const body = req.body

  try {
    // New event object
    const createdEvent = new Event({
      id: mongoose.Types.ObjectId(),
      name: body.name,
      dates: body.dates,
      votes: body.dates.map(d => {
        const a = {
          date: d,
          people: []
        }
        return a
      })
    })

    // Store the new event object in the database
    const newEvent = await createdEvent.save()
    res.status(201).send({ id: newEvent.id })
  } catch (e) {
    logger.log({
      level: 'error',
      message: `${e}`
    })
    next(e)
  }
})

module.exports = eventsRouter
