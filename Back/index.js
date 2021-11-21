const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const env = require('process').env;
require('dotenv').config();
// Middleware
const validateToken = require('./middleware/validateToken.middleware');

const app = express();
const server = http.createServer(app);

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
const uri = `mongodb+srv://${env.USER}:${env.PASSW}@cluster.gmeaf.mongodb.net/${env.DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('Mongodb connected')) 
  .catch(err => console.error('Mongodb error', err))

// Rutas de healthCheck
app.get(env.API_PATH+"/health-check", (req, res) => {
    res.json({
        api: "PQR Prueba",
        message: "Health OK!"
    })
});

// Rutas del API + middlewares
app.use(env.API_PATH, require('./routes/getToken.route'));
app.use(env.API_PATH, validateToken, require('./routes/getClients.route'));
app.use(env.API_PATH, validateToken, require('./routes/getPQRsClient.route'));
app.use(env.API_PATH, validateToken, require('./routes/updatePQRClient.route'));
app.use(env.API_PATH, validateToken, require('./routes/createPQRClient.route'));

// Ruta Not Found
app.use((req, res, next) => {
    res.status(404).send("Sorry cant find that!");
})

// Iniciar server
const PORT = env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server ready on: ${PORT}`);
})

// Close server
process.on("SIGTERM", () => {
  server.close(() => console.log("Server closed"));  
})

// Handle error
process.on("uncaughtException", (err) => {
    process.exitCode = 7;
    console.error("Server error:", err.message);
    process.kill(process.pid, "SIGTERM");
})