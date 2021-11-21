const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PQRSchema = new schema({
  _id: String,
  idClient: String,
  type: String,
  creationDate: { type: Date, default: Date.now },
  closedDate: Date,
  area: String,
  content: {
    reason: String,
    details: String
  },
  response: {
    user: String,
    details: String
  },
  claim: {
    _id: String,
    creationDate: Date,
    closedDate: Date,
    content: {
      reason: String,
      details: String
    },
    response: {
      user: String,
      details: String
    }
  }

});

// Crear el modelo
const PQR = mongoose.model('dc_PQR', PQRSchema);

module.exports = PQR;