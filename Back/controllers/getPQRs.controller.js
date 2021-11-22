const PQR = require('../models/PQR.model');

const getPQRs = async(idClient = "") => {
    try{
        if(idClient !== "") return await PQR.find({idClient}).exec();
        else return await PQR.find();
    }
    catch (err){
        console.error("Error getPQRs.controller", err);
        throw err;
    }
}

module.exports = getPQRs