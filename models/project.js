const mongoose = require('mongoose')
// shortcut to mongoose.Schema class
const Schema = mongoose.Schema

const projectsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
  },
  lon: {
    type: Number,
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
    type: String,
    required: true
  },
  implementedBy: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['No Ejecutado', 'Ejecutado'],
    required: true
  },
  author: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  pic: {
    type: String,
  }

}, {
  timestamps: true,
})

// compile the schema into a model and export
module.exports = mongoose.model('Project', projectsSchema)