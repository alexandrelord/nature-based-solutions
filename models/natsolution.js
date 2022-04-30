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
  location: [{
    region: String,
    city: String,
    latitude: String,
    longitude: String
  }],
  objective: String,
  budget: Number,
  st_date: Date,
  author: String,
  companies: [companiesSchema] // array of objects


}, {
  timestamp: true
})

// compile the schema into a model and export
module.exports = mongoose.model('Project', projectsSchema)