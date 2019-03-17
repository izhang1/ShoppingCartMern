const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Check for token
    if(!token) {
        // Unauthorized access status
        return res.status(401).json({ msg: "No token. Authnorization denied. "});
    }

    try {
        // Validate and verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Add user from payload to the request value 
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: `token is not valid, error: ${e}`});
    }
}

module.exports = auth;