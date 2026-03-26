// // import { useState } from 'react'

// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
//     <div className="app">
//       <Navbar user={user} setUser={setUser} />
//       <main className="container">
//         <Routes>
//           <Route path="/" element={<Feed />} />
//           <Route path="/register" element={<Register setUser={setUser} />} />
//           <Route path="/login" element={<Login setUser={setUser} />} />
//           <Route path="/profile/:id" element={<Profile user={user} />} />
//           <Route path="/create" element={ user ? <CreatePost user={user} /> : <Navigate to="/login" />} />
//           <Route path="*" element={<div>404</div>} />
//         </Routes>
//       </main>
// //     </>
// //   )
// // }

// // export default App

// // frontend/src/App.jsx
// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import Feed from './pages/Feed';
// import Profile from './pages/Profile';
// import CreatePost from './pages/CreatePost';
// import Navbar from './components/Navbar';

// function App() {
//   const [user, setUser] = useState(() => {
//     const u = localStorage.getItem('user');
//     return u ? JSON.parse(u) : null;
//   });

//   useEffect(() => {
//     if (user) localStorage.setItem('user', JSON.stringify(user));
//   }, [user]);

//   return (
    
//     <div>
//       <header className="header">Book Review App</header>

//       <nav className="navbar">
//         <a href="#">Home</a>
//         <a href="#">Books</a>
//         <a href="#">Reviews</a>
//       </nav>

//       <section className="card">
//         <h2>Welcome!</h2>
//         <p>This is your new Book Review frontend built using Vite + React.</p>

//         <button className="btn-primary">Get Started</button>
//       </section>
//     </div>
//     // </div>
//   );
// }

// export default App;

// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import Navbar from './components/Navbar';
// import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <div className="app">
      <Navbar user={user} setUser={setUser} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/create" element={ user ? <CreatePost user={user} /> : <Navigate to="/login" />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

