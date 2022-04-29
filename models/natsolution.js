const mongoose = require('mongoose')
// shortcut to mongoose.Schema class
const Schema = mongoose.Schema

// const userSchema

const natsolutionsSchema = new Schema({
  name: String,

})

// compile the schema into a model and export
module.exports = mongoose.model('NatSolution', natsolutionsSchema)