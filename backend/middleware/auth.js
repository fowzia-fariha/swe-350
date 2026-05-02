import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'swehub_secret');
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token.' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Admin only.' });
  next();
};

export const requireTeacher = (req, res, next) => {
  if (!['admin', 'teacher'].includes(req.user?.role))
    return res.status(403).json({ error: 'Teacher access required.' });
  next();
};