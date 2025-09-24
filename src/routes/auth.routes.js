import { Router } from 'express';
import * as controller from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/forgot-password', controller.forgotPassword);

export default router;


