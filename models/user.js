const { append } = require('express/lib/response')
const mongoose = require('mongoose')
// shortcut to mongoose.Schema class
const Schema = mongoose.Schema

const usersSchema = new Schema({
  name: String,
  email: String,
  googleId: String,
}, {
    timestamp: true
})

// compile the schema into a model and export
module.exports = mongoose.model('User', usersSchema)