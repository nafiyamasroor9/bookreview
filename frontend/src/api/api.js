    // frontend/src/api/api.js
    import axios from 'axios';

    const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || 'https://bookreview-vwnp.onrender.com',
    });

    API.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
    });

    export default API;

    // baseURL: import.meta.env.VITE_API_BASE || 'https://inkwell-leob.onrender.com',