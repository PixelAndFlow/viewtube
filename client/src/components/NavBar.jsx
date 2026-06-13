import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const ArrowBackIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
  </svg>
);

export default function NavBar() {
  const [query, setQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [allVideos, setAllVideos] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const { dark, toggleTheme } = useTheme();
  const mobileInputRef = useRef(null);
  const searchWrapRef = useRef(null);

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then(setAllVideos)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (mobileSearchOpen) mobileInputRef.current?.focus();
  }, [mobileSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmed = query.trim().toLowerCase();
  const suggestions = trimmed
    ? allVideos
        .filter(
          (v) =>
            v.title.toLowerCase().includes(trimmed) ||
            v.channel_name.toLowerCase().includes(trimmed)
        )
        .slice(0, 8)
    : [];

  const runSearch = (q) => {
    const text = q.trim();
    if (!text) return;
    navigate(`/search?q=${encodeURIComponent(text)}`);
    setShowSuggestions(false);
    setMobileSearchOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    runSearch(query);
  };

  const handleSuggestionClick = (text) => {
    setQuery(text);
    runSearch(text);
  };

  const handleQueryChange = (value) => {
    setQuery(value);
    setShowSuggestions(value.trim().length > 0);
  };

  return (
    <header className="navbar">
      <div className={`mobile-search-overlay${mobileSearchOpen ? ' open' : ''}`}>
        <button
          className="nav-icon-btn"
          type="button"
          onClick={() => setMobileSearchOpen(false)}
          aria-label="Close search"
        >
          <ArrowBackIcon />
        </button>
        <form className="mobile-search-form" onSubmit={handleSearch}>
          <input
            ref={mobileInputRef}
            className="mobile-search-input"
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
          />
        </form>
      </div>

      <div className="navbar-left">
        <button className="nav-icon-btn" aria-label="Menu">
          <MenuIcon />
        </button>
        <Link to="/" className="navbar-logo">
          <span className="logo-icon-wrap">▶</span>
          <span className="logo-wordmark">ViewTube</span>
        </Link>
      </div>

      <div className="navbar-search-wrap" ref={searchWrapRef}>
        <form className="navbar-search-form" onSubmit={handleSearch}>
          <input
            className="navbar-search-input"
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onFocus={() => trimmed && setShowSuggestions(true)}
          />
          <button type="submit" className="navbar-search-btn" aria-label="Search">
            <SearchIcon />
          </button>
        </form>
        {showSuggestions && suggestions.length > 0 && (
          <ul className="search-suggestions">
            {suggestions.map((v) => (
              <li key={v.id}>
                <button
                  type="button"
                  className="search-suggestion-item"
                  onClick={() => handleSuggestionClick(v.title)}
                >
                  <span className="search-suggestion-title">{v.title}</span>
                  <span className="search-suggestion-channel">{v.channel_name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="navbar-right">
        <button
          className="nav-icon-btn nav-search-mobile-btn"
          onClick={() => setMobileSearchOpen(true)}
          aria-label="Search"
        >
          <SearchIcon />
        </button>
        <button
          className="nav-icon-btn"
          onClick={toggleTheme}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={dark ? 'Light mode' : 'Dark mode'}
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
        <div className="nav-avatar" title="ViewTube User">V</div>
      </div>
    </header>
  );
}
