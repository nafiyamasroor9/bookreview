    // frontend/src/pages/Feed.jsx
    import React, { useEffect, useState } from 'react';
    import API from '../api/api';
    import PostCard from '../components/PostCard';
    import SearchBox from '../components/SearchBox';

    export default function Feed() {
    const [posts, setPosts] = useState([]);
    const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    const fetchPosts = async (q) => {
        try {
        const res = await API.get('/posts', { params: { q }});
        setPosts(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchPosts(); }, []);

    return (
        <div className="feed">
        <div className="feed-header">
            <h2>Latest Reviews</h2>
            <div className="search-container">
                <SearchBox onSearch={q => fetchPosts(q)} />
            </div>

        </div>
        <div className="posts-grid">
    {posts.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "40px", width: "100%" }}>
        No posts found 😔
        </p>
    ) : (
        posts.map(p => 
        <PostCard 
            key={p._id} 
            post={p} 
            currentUser={currentUser} 
            onDeleted={id => setPosts(posts.filter(x => x._id !== id))} 
        />
        )
    )}
</div>

        </div>
    );
    }
