import { NavLink } from 'react-router-dom';

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
  </svg>
);

export default function Sidebar() {
  return (
    <>
      <aside className="sidebar">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
        >
          <span className="sidebar-icon"><HomeIcon /></span>
          <span className="sidebar-label">Home</span>
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
        >
          <span className="sidebar-icon"><HistoryIcon /></span>
          <span className="sidebar-label">History</span>
        </NavLink>
        <NavLink
          to="/starred"
          className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
        >
          <span className="sidebar-icon"><StarIcon /></span>
          <span className="sidebar-label">Starred</span>
        </NavLink>
      </aside>

      <nav className="bottom-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
        >
          <HomeIcon />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
        >
          <HistoryIcon />
          <span>History</span>
        </NavLink>
        <NavLink
          to="/starred"
          className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
        >
          <StarIcon />
          <span>Starred</span>
        </NavLink>
      </nav>
    </>
  );
}
