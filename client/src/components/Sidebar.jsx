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
