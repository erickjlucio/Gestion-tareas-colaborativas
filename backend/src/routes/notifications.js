import { Router } from 'express';
import { authRequired } from '../middlewares/auth.js';
import { recent } from '../controllers/notificationController.js';

const router = Router();
router.use(authRequired);
router.get('/recent', recent);

export default router;
