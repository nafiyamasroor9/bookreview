    // frontend/src/components/SearchBox.jsx
import React, { useState } from 'react';

    export default function SearchBox({ onSearch }) {
    const [q, setQ] = useState('');

    return (
        <div className="search-container">
        <input
            placeholder="Search by title, genre or text..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
        />
        <button onClick={() => onSearch(q)}>Search</button>
        </div>
    );
    }
