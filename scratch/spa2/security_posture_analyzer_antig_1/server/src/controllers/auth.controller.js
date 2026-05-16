const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { get, run } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
  }

  try {
    const existing = await get('SELECT id FROM users WHERE email = ?', [email]);
    if (existing) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    const id = uuidv4();
    await run('INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)', [id, name, email, hashedPassword]);

    const token = jwt.sign({ id, name, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: { token, user: { id, name, email } },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    const user = await get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      message: 'Login successful.',
      data: { token, user: { id: user.id, name: user.name, email: user.email } },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
};

const getMe = (req, res) => {
  res.json({ success: true, data: { user: req.user } });
};

module.exports = { register, login, getMe };
