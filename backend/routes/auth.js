import express from 'express';
import regiserController from '../controllers/auth/signup.js'
import { logincontroller } from '../controllers/auth/login.js';
import{ logoutController} from '../controllers/auth/logout.js'
const router = express.Router()

router.post('/signup', regiserController)

router.post('/login',logincontroller)

router.post('/logout', logoutController)

export default router;