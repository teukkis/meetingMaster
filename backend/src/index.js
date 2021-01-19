require('dotenv').config()
const app = require('./app')
const http = require('http')
const stoppable = require('stoppable')
const server = stoppable(http.createServer(app))
const logger = require('./logger')

// SIGINT signal = ctrl-c in terminal
process.on('SIGINT', () => {
  logger.log({
    level: 'warn',
    message: 'SIGINT received'
  })
  shutdown()
})

// SIGTERM signal = process manager ( ie. docker container stop )
process.on('SIGTERM', () => {
  logger.log({
    level: 'warn',
    message: 'SIGTERM received'
  })
  shutdown()
})

const shutdown = () => {
  server.stop()
  logger.log({
    level: 'warn',
    message: 'Server shutting down'
  })
  process.exit()
}

// Start the application
server.listen(process.env.PORT, () => {
  logger.log({
    level: 'info',
    message: `Server running on port ${process.env.PORT}`
  })
})
