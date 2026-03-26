    // frontend/src/components/PostCard.jsx
    import React from 'react';
    import API from '../api/api';
    import { useNavigate } from 'react-router-dom';

    export default function PostCard({ post, currentUser, onDeleted }) {
    const nav = useNavigate();

    const deletePost = async () => {
        if (!confirm('Delete this post?')) return;

        try {
        await API.delete(`/posts/${post._id}`);
        onDeleted && onDeleted(post._id);
        } catch (err) {
        console.error(err);
        alert('Delete failed');
        }
    };

    //modern code showing short time
// const formatDate = (date) => {
//     const d = new Date(date);
//     return d.toLocaleDateString() + " • " + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// };

// like insta __ hours ago code

const formatDate = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 60000);

    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hrs ago`;
    return `${Math.floor(diff / 1440)} days ago`;
    };


    return (
        <article className="post-card">

        {/* ✅ CLEAN IMAGE HANDLING */}
        {post.image ? (
            <img
            src={`http://localhost:5000${post.image}`}
            alt={post.title}
            style={{ width: '100%', borderRadius: '8px' }}
            />
        ) : null}

        <div className="post-body">
            <h3>{post.title}</h3>

            <small className="genre">{post.genre}</small>

            <p>
            {post.description.slice(0, 280)}
            {post.description.length > 280 && '...'}
            </p>

            {post.link && (
            <a
                className="ext-link"
                href={post.link}
                target="_blank"
                rel="noreferrer"
                style={{textDecoration:"none", color:"green", fontWeight:"bold"}}
            >
                Download / Read
            </a>
            )}

            <div className="meta">
            <span>
                By <strong>{post.author?.name || 'Unknown'}</strong>
            </span>
        <span>{formatDate(post.createdAt)}</span>
            {/* <span>{new Date(post.createdAt).toLocaleString()}</span> */}
            </div>

            {/* ✅ DELETE BUTTON */}
            {currentUser && currentUser.id === post.author?._id && (
            <button className="btn danger" onClick={deletePost}>
                Delete
            </button>
            )}
        </div>
        </article>
    );
    }
