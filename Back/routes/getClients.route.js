const router = require('express').Router();
const getClients = require('../controllers/getClients.controller');

router.get('/get/clients', async (req, res) => {
    try{
        const clients = await getClients();

        res.json(clients);
    }
    catch (err){
        res.status(500).json({ err: err.message });
        console.error("Error getClients.route", err);
    }
})

module.exports = router;