    // frontend/src/pages/Login.jsx
    import React, { useState } from 'react';
    import API from '../api/api';
    import { useNavigate } from 'react-router-dom';

    export default function Login({ setUser }) {
    const [form, setForm] = useState({});
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
        const res = await API.post('/auth/login', form);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        nav('/');
        } catch (err) {
        alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div >
        <h2 style={{textAlign:"center", margin:"5% 50% 0 0" }}>Login</h2>
        <form onSubmit={submit} className="auth-card-login">
            <input placeholder="Email" type="email" onChange={e => setForm({...form, email: e.target.value})} required />
            <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} required />
            <button className="btn login-btn">Login</button>
        </form>
        </div>
    );
    }
