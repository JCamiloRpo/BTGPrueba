const PQR = require('../models/PQR.model');

const getPQRsClient = async(idClient) => {
    try{
        const PQRs = await PQR.find({idClient}).exec();
        
        return PQRs
    }
    catch (err){
        console.error("Error getPQRsClient.controller", err);
        throw err;
    }
}

module.exports = getPQRsClient