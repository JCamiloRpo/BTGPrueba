const router = require('express').Router();
const jwt = require('jsonwebtoken');
const getPQRs = require('../controllers/getPQRs.controller');

router.get('/get/pqr', async (req, res) => {
    try{
        const idClient = req.query.client;

        let PQRs = []
        if (idClient) PQRs = await getPQRs(idClient);
        else if (res.admin) PQRs = await getPQRs();

        res.json({ PQRs });
    }
    catch (err){
        res.status(500).json({ err: err.message });
        console.error("Error getPQRs.route", err);
    }
})

module.exports = router;