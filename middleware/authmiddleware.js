const jwt = require('jsonwebtoken');

const secretKey = 'asdhv23jb228hf82yh7ey72h82us';


function authenticate(req, res, next) {
    
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: false,
            message: 'Authorization token required' 
        });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: false, 
                message: 'Invalid or expired token' 
            });
        }

        req.user = decoded;
        next();
    });
}

module.exports = authenticate;
