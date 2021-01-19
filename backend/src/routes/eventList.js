const eventListRouter = require('express').Router()
const passport = require('passport')
const Event = require('../db/models/event')
const logger = require('../logger')

// requests for /api/v1/event/list
// return a list of events
eventListRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const events = await Event.find({})
    const response = events.map(e => {

      // A new event to be passed to the db
      const event = {
        id: e.id,
        name: e.name
      }
      return event
    })
    res.json({ events: response })
  } catch (e) {
    logger.log({
      level: 'error',
      message: `${e}`
    })
    next(e)
  }
})

module.exports = eventListRouter
