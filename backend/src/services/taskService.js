import { Task, Notification } from '../models/index.js';

export async function createTask(data) {
  const task = await Task.create(data);
  return task;
}

export async function updateTask(id, data) {
  const task = await Task.findByPk(id);
  if (!task) throw Object.assign(new Error('Tarea no encontrada'), { status: 404 });
  const prevStatus = task.status;
  await task.update(data);
  if (data.status && data.status !== prevStatus) {
    await Notification.create({ taskId: task.id, message: `Estado cambiado de ${prevStatus} a ${data.status}` });
  }
  return task;
}

export async function deleteTask(id) {
  const task = await Task.findByPk(id);
  if (!task) throw Object.assign(new Error('Tarea no encontrada'), { status: 404 });
  await task.destroy();
}

export async function recentNotificationsForUser(userId, limit=10) {
  // notifications for tasks assigned to user or created by user
  const { Task, Notification } = await import('../models/index.js');
  const tasks = await Task.findAll({ where: { assignedUserId: userId } , attributes: ['id'] });
  const ids = tasks.map(t => t.id);
  return Notification.findAll({ where: { taskId: ids }, order: [['createdAt', 'DESC']], limit });
}
