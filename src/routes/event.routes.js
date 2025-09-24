import { Router } from 'express';
import * as controller from '../controllers/event.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', requireAuth, controller.createEvent);
router.get('/', controller.listEvents);
router.get('/:id', controller.getEvent);
router.put('/:id', requireAuth, controller.updateEvent);
router.delete('/:id', requireAuth, controller.deleteEvent);

export default router;


