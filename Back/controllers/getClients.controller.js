const Client = require('../models/client.model');

const getClients = async() => {
    try{
        const clients = await Client.find();
        
        return { clients }
    }
    catch (err){
        console.error("Error getClients.controller", err);
        throw err;
    }
}

module.exports = getClients