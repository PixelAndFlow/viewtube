import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        ▶ ViewTube
      </Link>
      <form className="navbar-search-form" onSubmit={handleSearch}>
        <input
          className="navbar-search-input"
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="navbar-search-btn" aria-label="Search">
          🔍
        </button>
      </form>
      <div className="navbar-links">
        <Link to="/starred" className="navbar-link">
          ★ Starred
        </Link>
      </div>
    </nav>
  );
}
