    // frontend/src/pages/Register.jsx
    import React, { useState } from 'react';
    import API from '../api/api';
    import { useNavigate } from 'react-router-dom';

    export default function Register({ setUser }) {
    const [form, setForm] = useState({});
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
        const res = await API.post('/auth/register', form);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        nav('/');
        } catch (err) {
        alert(err.response?.data?.message || 'Register failed');
        }
    };

    return (
        <div className="auth-card-reg">
        <h2>Register</h2>
        <form onSubmit={submit}>
            <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} required />
            <input placeholder="Email" type="email" onChange={e => setForm({...form, email: e.target.value})} required />
            <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} required />
            <input placeholder="Contact" onChange={e => setForm({...form, contact: e.target.value})} />
            <textarea placeholder="Bio" onChange={e => setForm({...form, bio: e.target.value})} />
            <button className="btn">Register</button>
        </form>
        </div>
    );
    }
