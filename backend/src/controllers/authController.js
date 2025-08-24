import { registerSchema, loginSchema } from '../utils/validators.js';
import * as authService from '../services/authService.js';

export async function register(req, res, next) {
  try {
    const value = await registerSchema.validateAsync(req.body);
    const out = await authService.register(value);
    res.json(out);
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const value = await loginSchema.validateAsync(req.body);
    const out = await authService.login(value);
    res.json(out);
  } catch (e) { next(e); }
}
