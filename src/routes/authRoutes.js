const express = require('express');
const router = express.Router();
const { registerUser, loginUser, loginValidationRules } = require('../controllers/authController');

// Routes for authentication
router.post('/signup', registerUser);
router.post('/login', loginValidationRules(), loginUser);

module.exports = router;
