// 2.Router
import express from 'express';
import { authController } from './auth.controller';

const router = express.Router()

router.post('/register', authController.addUserToDB as unknown as express.RequestHandler)
router.post('/login', authController.logInUser as unknown as express.RequestHandler)

export const authRoutes = router