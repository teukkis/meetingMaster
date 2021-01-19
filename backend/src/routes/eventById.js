const eventByIdRouter = require('express').Router({ mergeParams: true })
const passport = require('passport')
const Event = require('../db/models/event')
const logger = require('../logger')

// requests for /api/v1/event/:id
// return the event corresponding to the id
eventByIdRouter.get('/', async (req, res, next) => {
  try {
    const id = req.params.id
    const event = await Event.findOne({ id: id })

    // Check first if id is valid
    if (event !== null) {
      return res.json(event)
    } else {
      res.status(404).send('not found')
    }
  } catch (e) {
    logger.log({
      level: 'error',
      message: `${e}`
    })
    next(e)
  }
})

// Add a new vote to the event
// and return full event document
eventByIdRouter.post('/vote', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const body = req.body
  const id = req.params.id

  try {
    const event = await Event.findOne({ id: id })

    // Create an array of dates that are matching
    // -> Dates user voted and dates event has
    
    const matchingDates = event.dates.filter(date => body.votes.includes(date))
    const n = event.votes.map(v => {
      if (matchingDates.includes(v.date)) {
        if (!v.people.includes(body.name)) {
          v.people.push(body.name)
        }
      }
      return v
    })

    const doc = await Event.findOneAndUpdate({ id: id }, { votes: n }, { new: true })
    res.status(201).send(doc)
  } catch (e) {
    next(e)
  }
})

// return the results, which dates work for all
eventByIdRouter.get('/results', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const id = req.params.id
    const event = await Event.findOne({ id: id })

    // Take names of all users
    let allNames = event.votes.map(v => {
      return v.people
    }).flat()

    // Remove duplicate names
    allNames = [...new Set(allNames)]

    const response = {
      id: event.id,
      name: event.name,
      suitableDates: []
    }

    // Loop through the array containing names of all users
    // Compare those names with people who have voted
    // If those two arrays are equal, the date works for all users
    event.votes.map(v => {
      const a = allNames.filter(item => !v.people.includes(item))
      if (a.length === 0) {
        return response.suitableDates.push(v)
      }
    })

    return res.status(200).send(response)
  } catch (e) {
    logger.log({
      level: 'error',
      message: `${e}`
    })
  }
})

module.exports = eventByIdRouter
