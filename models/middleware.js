const jwt = require("jsonwebtoken");
const config = require("../config/config")

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token){
        return res.status(403).send({message: 'No Token Provided'});
    }
    jwt.verify(token, config.secret,(err, decoded) => {
        if(err){
            return res.status(401).send({message: "Unauthorized!"});
        }
        req.email = decoded.email;
        next();
    })
}