import { commentSchema } from '../utils/validators.js';
import { Comment } from '../models/index.js';

export async function listComments(req, res, next) {
  try {
    const comments = await Comment.findAll({ where: { taskId: req.params.id }, order: [['createdAt', 'ASC']] });
    res.json(comments);
  } catch (e) { next(e); }
}

export async function addComment(req, res, next) {
  try {
    const value = await commentSchema.validateAsync(req.body);
    const c = await Comment.create({ taskId: req.params.id, userId: req.user.id, content: value.content });
    res.status(201).json(c);
  } catch (e) { next(e); }
}
