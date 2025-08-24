import Joi from 'joi';

// Crear tarea → título requerido
export const createTaskSchema = Joi.object({
  title: Joi.string().min(2).max(200).required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('pending', 'in_progress', 'completed').optional(),
  dueDate: Joi.string().allow('', null),
  assignedUserId: Joi.number().integer().allow(null)
});

// Actualizar tarea → título opcional
export const updateTaskSchema = Joi.object({
  title: Joi.string().min(2).max(200).optional(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('pending', 'in_progress', 'completed').optional(),
  dueDate: Joi.string().allow('', null),
  assignedUserId: Joi.number().integer().allow(null)
});

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(64).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'admin').optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const commentSchema = Joi.object({
  content: Joi.string().min(1).required()
});
