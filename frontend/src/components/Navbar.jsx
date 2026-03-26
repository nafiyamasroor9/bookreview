    // // frontend/src/components/Navbar.jsx
    // import React from 'react';
    // import { Link, useNavigate } from 'react-router-dom';

    // export default function Navbar({ user, setUser }) {
    // const nav = useNavigate();
    // const logout = () => {
    //     localStorage.removeItem('user');
    //     localStorage.removeItem('token');
    //     setUser(null);
    //     nav('/');
    // }
    // return (
    //     <nav className="navbar">
    //     <div className="logo"><h2 style={{color:"white"}}><Link to="/">BookReviews</Link></h2></div>
    //     <div className="nav-right">
    //         <Link to="/"style={{marginRight:"10px"}}>Feed</Link>
    //         {user ? (
    //         <>
    //             <Link to={`/profile/${user.id}`}><span style={{marginRight:"10px", margin:"10px"}}>{user.name}</span></Link>
    //             <Link to="/create" className="btn" style={{marginRight:"10px"}}>Create Post</Link>
    //             <button onClick={logout} className="btn ghost">Logout</button>
    //         </>
    //         ) : (
    //         <>
    //             <Link to="/login">Login</Link>
    //             <Link to="/register" className="btn" >Register</Link>
    //         </>
    //         )}
    //     </div>
    //     </nav>
    // );
    // }


    // frontend/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate, NavLink} from 'react-router-dom';

    export default function Navbar({ user, setUser }) {
    const nav = useNavigate();

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        nav('/login');
    };

    return (
        <nav className="navbar">
        {/* LEFT */}
        <h2 className="logo">
            <Link to="/">Book Review 📚</Link>
        </h2>

        {/* RIGHT */}
        <div className="nav-right">
            <NavLink to="/" className={({isActive}) => isActive ? "active-link" : ""}>Feed</NavLink>

            {user && <Link to="/create">Create Post</Link>}

            {user ? (
            <>
                <Link to={`/profile/${user.id}`} className="username">
                {user.name}
                </Link>
                <button onClick={logout} className="btn small">
                Logout
                </button>
            </>
            ) : (
            <>
                <Link to="/login">Login</Link>
                <Link to="/register" className="btn">
                Register
                </Link>
            </>
            )}
        </div>
        </nav>
    );
    }
