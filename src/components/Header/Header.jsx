import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ loggedIn, onLogout, userData }) => {

  // Define navigation links based directly on the loggedIn prop and userData check
  const navigationLinks = loggedIn && userData ? (
    <>
      <span>Hello, {userData.username}!</span> 
      <button onClick={onLogout}>Logout</button>
    </>
  ) : (
    <>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
  );

  return (
    <header className="header">
      <div className="left-section">
        <nav className="navigation">
          {navigationLinks}
        </nav>
        <div className="logo">
          <Link to="/">Full Shop Academy</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
