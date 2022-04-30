const mongoose = require('mongoose')
// shortcut to mongoose.Schema class
const Schema = mongoose.Schema

// const userSchema

const companiesSchema = new Schema({
  name: String,
  url: String,
  role: String
}, {
  timestamp: true,
})

const projectsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  objective: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Date,
    required: true
  },
  implementedBy: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },

}, {
  timestamp: true
})

// compile the schema into a model and export
module.exports = mongoose.model('Project', projectsSchema)