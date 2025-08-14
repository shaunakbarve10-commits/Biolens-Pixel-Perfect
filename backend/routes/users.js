const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users, uuid } = require('../data/storage');
const { SECRET } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: User Registration
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, role]
 *             properties:
 *               name: { type: string, example: "John Cena" }
 *               email: { type: string, format: email, example: "john@example.com" }
 *               password: { type: string, example: "securePass123" }
 *               role: { type: string, enum: [patient, student, educator], example: "patient" }
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Name, email, and password are required.
 *       409:
 *         description: Email already registered.
 */
router.post('/register', async (req, res) => {
  const { name, email, password, role = 'patient' } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }
  const exists = users.find(u => u.email === email);
  if (exists) return res.status(409).json({ error: 'Email already registered.' });

  const id = uuid();
  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ id, name, email, passwordHash, role });
  return res.status(201).json({
    message: 'User registered successfully',
    user: { id, name, email, role }
  });
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User Login (returns JWT)
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "john@example.com" }
 *               password: { type: string, example: "securePass123" }
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Invalid email or password.
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid email or password.' });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ error: 'Invalid email or password.' });

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '2h' });
  return res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});

module.exports = router;
