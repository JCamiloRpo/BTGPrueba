const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.get('/get/token', async (req, res) => {
    try{
        const admin = req.header("admin");

        const token = jwt.sign({ admin }, process.env.SECRET_JWT);

        res.json({ token, admin });
    }
    catch (err){
        res.status(500).json({ err: err.message });
        console.error("Error getToken.route", err);
    }
})

module.exports = router;