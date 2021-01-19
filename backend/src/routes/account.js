const accountRouter = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const logger = require('../logger')

accountRouter.post('/register', async (request, response, next) => {
  // Call Passport for handling registration correctly
  passport.authenticate('register', async (error, user) => {
    try {
      // Message of the user object is defined when there is an validation error
      if (user.message) {
        logger.log({
          level: 'error',
          message: `${user.message}`
        })
        return next(error)
      } else {
        logger.log({
          level: 'info',
          message: `user registered`
        })
        return response.status(201).end()
      }
    } catch (error) {
      return next(error)
    }
  })(request, response, next)
})

// Login requests comes here
accountRouter.post('/login', async (request, response, next) => {
  passport.authenticate('login', async (error, user, info) => {
    // the authentication is handled by Passport.js
    // This block is executed only if the validation is successful
    try {
      if (error || !user) {
        return next(error)
      }
      request.logIn(user, { session: false }, async (error) => {
        if (error) {
          return next(error)
        }

        const body = { id: user.id, username: user.username }
        const signedToken = jwt.sign({ user: body }, 'privatekey')
        const token = 'Bearer ' + signedToken

        return response.json({ token, user: user.username })
      })
    } catch (error) {
      return next(error)
    }
  })(request, response, next)
})

module.exports = accountRouter
