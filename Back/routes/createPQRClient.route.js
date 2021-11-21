const router = require('express').Router();
const validate = require('jsonschema').validate;
const bodySchema = require('../schemas/bodyPQR.schema');
const createPQRClient = require('../controllers/createPQRClient.controller');

router.post('/create/pqr', async (req, res) => {
    try{
        const body = req.body;

        const validateResult = validate(req.body, bodySchema);
        if (!validateResult.valid) return res.status(400).json({ error: "Body error", validateErrors: validateResult.errors })

        const PQR = await createPQRClient(body)

        res.json({ PQR });
    }
    catch (err){
        res.status(500).json({ err: err.message });
        console.error("Error createPQRClient.route", err);
    }
})

module.exports = router;