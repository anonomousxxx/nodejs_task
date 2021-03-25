require('../utils/loadEnv');
const jwt = require('jsonwebtoken');

let jwtSecret = process.env.JWT_SECRET
let jwtTokenExpire = process.env.JWT_TOKEN_EXPIRE
let jwtIssuer = process.env.JWT_ISSUER
let options = {expiresIn: jwtTokenExpire, issuer: jwtIssuer};

module.exports = {
    createToken: (userId) => {
        const payload = {id: userId};
        return jwt.sign(payload, jwtSecret, options);
    },
    validateToken: (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader === undefined || !authHeader.startsWith("Bearer ")) {
            res.status(401).send({error: 'Token required'})
        } else {
            try {
                let token = authHeader.substring(7, authHeader.length);
                req.user_id = jwt.verify(token, process.env.JWT_SECRET, options).id
                next()
            } catch (err) {
                res.status(401).send({error: 'Authorization error'})
            }
        }
    }
}