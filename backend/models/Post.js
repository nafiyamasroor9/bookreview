    // backend/models/Post.js
    const mongoose = require('mongoose');

    const PostSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String }, // stores relative path or external URL
    title: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String }, // link to soft copy or external resource
    }, { timestamps: true });

    module.exports = mongoose.model('Post', PostSchema);
