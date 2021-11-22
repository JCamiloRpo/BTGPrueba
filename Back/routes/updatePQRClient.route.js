const router = require('express').Router();
const validate = require('jsonschema').validate;
const bodySchema = require('../schemas/bodyPQR.schema');
const updatePQRClient = require('../controllers/updatePQRClient.controller');

router.put('/update/pqr/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const body = req.body;
        if (!id) return res.status(400).json({ error: "Path param 'id' is required" })
        const validateResult = validate(req.body, bodySchema);
        console.log("validate", validateResult.errors);
        if (!validateResult.valid) return res.status(400).json({ error: "Body error", validateErrors: validateResult.errors })

        const PQR = await updatePQRClient(id, body)
        
        res.json({ PQR });
    }
    catch (err){
        res.status(500).json({ err: err.message });
        console.error("Error updatePQRClient.route", err);
    }
})

module.exports = router;