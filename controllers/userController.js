const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const secretKey = 'asdhv23jb228hf82yh7ey72h82us';

// Signup function
async function signup(req, res) {
    const { firstname, lastname, email, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ firstname, lastname, email, password: hash });
        res.status(201).json({ 
            status: true,
            message: 'User created successfully',
            obj: user 
        });
    } catch (err) {
        res.status(400).json({ 
            status: false,
            message: err.message 
        });
    }
}

// Login function
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {

            const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
                expiresIn: '12h'
            });

            res.status(200).json({
                status: true,
                message: 'Login successful',
                token: token
            });
        } else {
            res.status(401).json({
                status: false, 
                message: 'Invalid username or password' 
            });
        }
    } catch (err) {
        res.status(400).json({
            status: false, 
            message: err.message 
        });
    }
}

module.exports = {
    signup,
    login
};
