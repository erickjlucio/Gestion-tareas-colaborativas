import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/index.js';

dotenv.config();

export async function register({ name, email, password, role }) {
  const exists = await User.findOne({ where: { email } });
  if (exists) throw Object.assign(new Error('Email ya registrado'), { status: 400 });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role: role || 'user' });
  return toAuthResponse(user);
}

export async function login({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw Object.assign(new Error('Credenciales inválidas'), { status: 401 });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw Object.assign(new Error('Credenciales inválidas'), { status: 401 });
  return toAuthResponse(user);
}

function toAuthResponse(user) {
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}
