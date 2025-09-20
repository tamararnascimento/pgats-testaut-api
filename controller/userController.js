const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const authMiddleware = require('../service/authMiddleware');

router.post('/register', userService.register);
router.post('/login', userService.login);
router.get('/', authMiddleware, userService.getUsers);

module.exports = router;
