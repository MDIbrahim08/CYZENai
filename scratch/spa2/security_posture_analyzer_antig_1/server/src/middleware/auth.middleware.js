const jwt = require('jsonwebtoken');
const { get } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if user still exists
    const user = await get('SELECT id, name, email FROM users WHERE id = ?', [decoded.id]);
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token. User not found.' });
    }

    req.user = user;
    next();
  } catch (ex) {
    res.status(401).json({ success: false, message: 'Invalid token.' });
  }
};

module.exports = authenticate;
