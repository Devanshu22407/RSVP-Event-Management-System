import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const bearer = header.startsWith('Bearer ') ? header.slice(7) : null;
    const cookieToken = req.cookies?.token || null;
    const token = bearer || cookieToken;
    const jwtSecret = process.env.JWT_SECRET || 'dev_secret_change_me';
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export async function requireAdmin(req, res, next) {
  try {
    if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden' });
  }
}


