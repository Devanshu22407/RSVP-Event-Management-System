import { Router } from 'express';
import * as controller from '../controllers/comment.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/:eventId', requireAuth, controller.addComment);
router.get('/:eventId', controller.listComments);

export default router;


