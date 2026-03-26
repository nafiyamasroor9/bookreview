    // backend/routes/posts.js
    const express = require('express');
    const router = express.Router();
    const multer = require('multer');
    const path = require('path');
    const Post = require('../models/Post');
    const auth = require('../middleware/middleware');

    // multer storage (save to /uploads)
    const storage = multer.diskStorage({
    destination: function(req, file, cb){ cb(null, 'uploads/'); },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
    }
    });
    const upload = multer({ storage });

    // get feed (with optional search)
    router.get('/', async (req, res) => {
    try {
        const q = req.query.q || '';
        const filter = q ? { $or: [
        { title: new RegExp(q, 'i') },
        { genre: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        ]} : {};
        const posts = await Post.find(filter).populate('author', 'name bio').sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
    });

    // get posts by user
    router.get('/user/:userId', async (req, res) => {
    try {
        const posts = await Post.find({ author: req.params.userId })
        .populate('author', 'name bio')
        .sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) { 
        console.error(err); 
        res.status(500).json({ message: 'Server error' }); 
    }
    });

    // get single post
    router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'name bio email');
        if (!post) return res.status(404).json({ message: 'Not found' });
        res.json(post);
    } catch (err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
    });
    
    // create post
    router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const { title, genre, description, link } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : req.body.image || '';
        if (!title || !genre || !description) return res.status(400).json({ message: 'Missing fields' });
        const post = new Post({ author: req.user._id, image, title, genre, description, link });
        await post.save();
        const populated = await post.populate('author', 'name email bio');
        res.json(populated);
    } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
    });

    // delete post (only owner)
    router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Not found' });
        if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
    });

    module.exports = router;
