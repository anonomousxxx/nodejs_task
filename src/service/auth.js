require('../utils/loadEnv');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET
const jwtTokenExpire = process.env.JWT_TOKEN_EXPIRE
const jwtIssuer = process.env.JWT_ISSUER
const options = {expiresIn: jwtTokenExpire, issuer: jwtIssuer};

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
                const token = authHeader.substring(7, authHeader.length);
                req.user_id = jwt.verify(token, process.env.JWT_SECRET, options).id
                next()
            } catch (err) {
                res.status(401).send({error: 'Authorization error'})
            }
        }
    }
}