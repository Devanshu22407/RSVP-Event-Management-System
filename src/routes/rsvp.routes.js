import { Router } from 'express';
import * as controller from '../controllers/rsvp.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/:eventId', requireAuth, controller.joinEvent);
router.delete('/:eventId', requireAuth, controller.cancelRsvp);

export default router;


