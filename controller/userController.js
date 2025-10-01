import express from 'express';
import userService from '../service/userService.js';
import authMiddleware from '../service/authMiddleware.js';

const router = express.Router();
router.post('/register', userService.register);
router.post('/login', userService.login);
router.get('/', authMiddleware, userService.getUsers);

export default router;
