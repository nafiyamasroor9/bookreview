    // frontend/src/pages/CreatePost.jsx
    import React, { useState } from 'react';
    import API from '../api/api';
    import { useNavigate } from 'react-router-dom';

    export default function CreatePost() {
    const [form, setForm] = useState({});
    const [file, setFile] = useState(null);
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
        const data = new FormData();


        data.append('title', form.title || '');
        data.append('genre', form.genre || '');
        data.append('description', form.description || '');
        data.append('link', form.link || '');


        if (file) data.append('image', file);

        const res = await API.post('/posts', data, { headers: { 
            'Content-Type': 'multipart/form-data',}
        });
        alert('Posted | Post created successfully!');
        nav('/');
        } catch (err) {
            console.log(err); //helps in debugging
        alert(err.response?.data?.message || 'Post failed');
        }
    }

    return (
        <div className="card">
        <h2>Create Post</h2>

        <form onSubmit={submit} className="create-form" style={{marginTop:"10px"}}>

            <input 
            placeholder="Title" 
            onChange={e => setForm({...form, title: e.target.value})} 
            required />

            <input placeholder="Genre" onChange={e => setForm({...form, genre: e.target.value})} required />
            <textarea placeholder="Write your review" onChange={e => setForm({...form, description: e.target.value})} required />
            <input placeholder="Link to soft copy (optional)" onChange={e => setForm({...form, link: e.target.value})} />
            {/* <img src={`http://localhost:5000${post.image}`} alt="imageX" srcset="" /> */}
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
            <button className="btn" style={{marginTop:"40px"}}>Publish</button>
        </form>
        </div>
    );
    }
