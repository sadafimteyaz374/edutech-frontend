import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span>EduTech</span>
      </Link>

      <ul className="navbar-links">
        <li><Link to="/" className={isActive('/')}>Home</Link></li>
        <li><Link to="/about" className={isActive('/about')}>About</Link></li>
        <li><Link to="/feature" className={isActive('/feature')}>Feature</Link></li>
        <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
        {isLoggedIn && (
          <>
            <li><Link to="/predict" className={isActive('/predict')}>Predict</Link></li>
            <li><Link to="/history" className={isActive('/history')}>History</Link></li>
            <li>
              <span
                onClick={handleLogout}
                style={{ cursor: 'pointer', color: '#fb0808', fontSize: '0.9rem' }}
              >
                Logout ({user?.name?.split(' ')[0]})
              </span>
            </li>
          </>
        )}
      </ul>

      {!isLoggedIn && (
        <Link to="/register" className="btn-signup">
          Sign Up
        </Link>
      )}
    </nav>
  );
};

export default Navbar;