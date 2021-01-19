const mongoose = require('mongoose')
const logger = require('../logger')

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
)
  .then(() => {
    logger.log({
      level: 'info',
      message: `Connected to the database, ${process.env.MONGODB_URI}`
    })
  }).catch(error => {
    logger.log({
      level: 'error',
      message: `${error}`
    })
  })
