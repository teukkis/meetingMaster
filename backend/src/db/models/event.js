const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  dates: {
    type: Array
  },
  votes: {
    type: Array
  }
})

// remove fields "_id" and "__v"
eventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
