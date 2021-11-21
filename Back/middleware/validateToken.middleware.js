const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('token');

    if(!token) return res.status(401).json({ error: "Acceso denegado" });

    try{
        const verified = jwt.verify(token, process.env.SECRET_JWT);
        res.admin = verified;
        next();
    }
    catch (err){
        res.status(400).json({ error: "token no válido" });
    }
}

module.exports = verifyToken;