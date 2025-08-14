const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../data');
const router = express.Router();

router.post('/register', (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required." });
    }
    if (users.find(u => u.email === email)) {
        return res.status(409).json({ error: "Email already registered." });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { id: Date.now().toString(), name, email, role, password: hashedPassword };
    users.push(newUser);
    res.status(201).json({
        message: "User registered successfully",
        user: { id: newUser.id, name, email, role }
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "Invalid email or password." });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, "secret", { expiresIn: "1h" });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});

module.exports = router;
