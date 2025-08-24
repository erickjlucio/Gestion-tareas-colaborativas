import { recentNotificationsForUser } from '../services/taskService.js';

export async function recent(req, res, next) {
  try {
    const limit = parseInt(req.query.limit || '10', 10);
    const list = await recentNotificationsForUser(req.user.id, limit);
    res.json(list);
  } catch (e) { next(e); }
}
