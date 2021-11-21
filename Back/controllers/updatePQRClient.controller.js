const PQR = require('../models/PQR.model');

const updatePQRClient = async(id, change) => {
    try{
        const PQR_DB = await PQR.findByIdAndUpdate(id, change, { useFindAndModify: false });
        console.log("PQR Actualizada");

        const PQR_Update = await PQR.findById(PQR_DB.id);
        
        return PQR_Update
    }
    catch (err){
        console.error("Error updatePQRClient.controller", err);
        throw new Error(err.message);
    }
}

module.exports = updatePQRClient