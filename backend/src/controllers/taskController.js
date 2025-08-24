import { createTaskSchema, updateTaskSchema } from '../utils/validators.js';
import { Task, Comment, User } from '../models/index.js';
import * as taskService from '../services/taskService.js';

export async function listMyTasks(req, res, next) {
  try {
    const where = req.user.role === 'admin' && req.query.all === '1'
      ? {}
      : { assignedUserId: req.user.id };
    const tasks = await Task.findAll({
      where,
      include: [
        { model: User, as: 'assignedTo', attributes: ['id','name','email'] },
        { model: User, as: 'owner', attributes: ['id','name','email'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(tasks);
  } catch (e) { next(e); }
}

export async function getTask(req, res, next) {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [
        { model: Comment, as: 'comments', include: [{ model: User, attributes: ['id','name'] }] },
        { model: User, as: 'assignedTo', attributes: ['id','name','email'] },
        { model: User, as: 'owner', attributes: ['id','name','email'] }
      ]
    });
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(task);
  } catch (e) { next(e); }
}

export async function createTaskCtl(req, res, next) {
  try {
    const value = await createTaskSchema.validateAsync(req.body);
    const data = { ...value, userId: req.user.id };
    if (req.file) data.attachmentPath = req.file.path;
    const task = await taskService.createTask(data);
    res.status(201).json(task);
  } catch (e) { next(e); }
}

export async function updateTaskCtl(req, res, next) {
  try {
    const value = await updateTaskSchema.validateAsync(req.body);
    const data = { ...value };
    if (req.file) data.attachmentPath = req.file.path;
    const task = await taskService.updateTask(req.params.id, data);
    res.json(task);
  } catch (e) { next(e); }
}

export async function deleteTaskCtl(req, res, next) {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(204).end();
  } catch (e) { next(e); }
}
