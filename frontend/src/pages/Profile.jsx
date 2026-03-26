    // // frontend/src/pages/CreatePost.jsx
    // import React, { useState } from 'react';
    // import API from '../api/api';
    // import { useNavigate } from 'react-router-dom';
    // import { useParams } from 'react-router-dom';

    
    
    // export default function CreatePost() {
    //     const [form, setForm] = useState({});
    //     const [file, setFile] = useState(null);
    //     const nav = useNavigate();
    //     const { id } = useParams();

    // const submit = async (e) => {
    //     e.preventDefault();
    //     try {
    //     const data = new FormData();
    //     data.append('title', form.title || '');
    //     data.append('genre', form.genre || '');
    //     data.append('description', form.description || '');
    //     data.append('link', form.link || '');
    //     if (file) data.append('image', file);

    //     const res = await API.post('/posts', data, { headers: { 'Content-Type': 'multipart/form-data'}});
    //     alert('Posted');
    //     nav('/');
    //     } catch (err) {
    //     alert(err.response?.data?.message || 'Post failed');
    //     }
    // }

    // return (
    //     <div className="card">
    //     <h2>Create Review</h2>
    //     <form onSubmit={submit} className="create-form">
    //         <input placeholder="Title" onChange={e => setForm({...form, title: e.target.value})} required />
    //         <input placeholder="Genre" onChange={e => setForm({...form, genre: e.target.value})} required />
    //         <textarea placeholder="Write your review" onChange={e => setForm({...form, description: e.target.value})} required />
    //         <input placeholder="Link to soft copy (optional)" onChange={e => setForm({...form, link: e.target.value})} />
    //         <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
    //         <button className="btn">Publish</button>
    //     </form>
    //     </div>
    // );
    // }

    // frontend/src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import PostCard from '../components/PostCard';

    export default function Profile() {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
        try {
            const res = await API.get(`/posts/user/${id}`);
            setPosts(res.data);
        } catch (err) {
            console.error(err);
        }
        };

        fetchUserPosts();
    }, [id]);

    return (
        <div className="feed">
        <h2 style={{ padding: "20px" }}>User Posts</h2>

        <div className="posts-grid">
            {posts.length > 0 ? (
            posts.map(p => <PostCard key={p._id} post={p} />)
            ) : (
            <p style={{ padding: "20px" }}>No posts yet</p>
            )}
        </div>
        </div>
    );
    }
