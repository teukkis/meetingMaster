const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(info => `${info.level}---> ${info.message}  || ${info.timestamp}`)
  ),
  transports: [
    new winston.transports.Console()
  ]
})

module.exports = logger
