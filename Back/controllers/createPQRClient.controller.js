const PQR = require('../models/PQR.model');

const createPQRClient = async(pqr) => {
    try{
        const PQR_DB = await PQR.create(pqr);
        
        console.log("PQR creada");
        
        return PQR_DB
    }
    catch (err){
        console.error("Error createPQRClient.controller", err);
        throw new Error(err.message);
    }
}

module.exports = createPQRClient