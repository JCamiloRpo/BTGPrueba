const router = require('express').Router();
const getPQRsClient = require('../controllers/getPQRsClient.controller');

router.get('/get/pqr', async (req, res) => {
    try{
        const idClient = req.query.client;
        if (!idClient) return res.status(400).json({ error: "Query param 'client' is required" })

        const PQRs = await getPQRsClient(idClient);

        res.json(PQRs);
    }
    catch (err){
        res.status(500).json({ err: err.message });
        console.error("Error getPQRsClient.route", err);
    }
})

module.exports = router;