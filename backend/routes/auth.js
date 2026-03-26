    // backend/routes/auth.js
    const express = require('express');
    const router = express.Router();
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const User = require('../models/User');

    // register
    router.post('/register', async (req, res) => {
    const { name, email, password, contact, bio } = req.body;
    try {
        if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already used' });
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = new User({ name, email, passwordHash, contact, bio });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, contact: user.contact, bio: user.bio }});
    } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
    });

    // login
    router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, contact: user.contact, bio: user.bio }});
    } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
    });

    module.exports = router;
