const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
  _id: String,
  name:  String
});

// Crear el modelo
const Client = mongoose.model('dc_client', clienteSchema);

module.exports = Client;