import { Router } from 'express';
import * as controller from '../controllers/user.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/:id', requireAuth, controller.getUser);
router.put('/:id', requireAuth, controller.updateUser);
router.put('/:id/password', requireAuth, controller.changePassword);

export default router;


