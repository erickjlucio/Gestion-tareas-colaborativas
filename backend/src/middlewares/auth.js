import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function authRequired(req, res, next) {
  const hdr = req.headers['authorization'];
  if (!hdr) return res.status(401).json({ error: 'Token requerido' });
  const [type, token] = hdr.split(' ');
  if (type !== 'Bearer' || !token) return res.status(401).json({ error: 'Formato de token inválido' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    next();
  };
}
