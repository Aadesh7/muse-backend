const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authmiddleware');

const router = express.Router();

// Define routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.get('/profile', authenticate, (req, res) => {
    res.json({ 
        message: 'Welcome to your profile', 
        user: req.user 
    });
});

module.exports = router;
