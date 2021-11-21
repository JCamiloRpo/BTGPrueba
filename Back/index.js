const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const env = require('process').env;
require('dotenv').config();

const app = express();

// Manejo del body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Manejo de cors
const corsOptions = {
    origin: "*", // El dominio del front
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Conexion a bd


// Importar rutas del API


// Rutas + middlewares


// Iniciar server
const PORT = env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ready on: ${PORT}`);
})