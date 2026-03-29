    // backend/server.js
    require('dotenv').config();
    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    const path = require('path');

    const authRoutes = require('./routes/auth');
    const postRoutes = require('./routes/posts');

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // routes
    app.use('/api/auth', authRoutes);
    app.use('/api/posts', postRoutes);

    const PORT = process.env.PORT || 5000;
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Mongo connected");

        app.listen(process.env.PORT || 5000, () => {
        console.log("Server running");
        });
    })
    .catch(err => {
        console.error("Mongo error:", err);
    });
    
    // old code
// mongoose.connect(process.env.MONGO_URI,{ 
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true 
    // })
    
