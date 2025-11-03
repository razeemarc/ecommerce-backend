// src/routes/auth.routes.ts

import { Router } from 'express';
import { AuthController } from './auth.controller';


const router = Router();
const authController = new AuthController();


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/verify', authController.verifyToken);

export default router;