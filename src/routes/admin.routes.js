import { Router } from 'express';
import * as controller from '../controllers/admin.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/users', requireAuth, requireAdmin, controller.listUsers);
router.put('/users/:id/block', requireAuth, requireAdmin, controller.toggleBlockUser);
router.get('/events', requireAuth, requireAdmin, controller.listEventsForModeration);
router.put('/events/:id/approve', requireAuth, requireAdmin, controller.approveEvent);
router.put('/events/:id/reject', requireAuth, requireAdmin, controller.rejectEvent);
router.delete('/events/:id', requireAuth, requireAdmin, controller.deleteEvent);

// EJS admin pages
router.get('/login', controller.renderLogin);
router.post('/login', controller.adminLogin);
router.get('/dashboard', requireAuth, requireAdmin, controller.renderDashboard);
router.get('/manage-users', requireAuth, requireAdmin, controller.renderUsers);
router.get('/manage-events', requireAuth, requireAdmin, controller.renderEvents);

export default router;


