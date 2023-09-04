
import './Header.css';

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <Link to="">Devlink Marketplace</Link>
      <div className="header-links">
        <Link to="#">Find DEV</Link>
        <Link to="#">Find Jobs</Link>
        <Link to="/">Login</Link>
        <Link to="/create-account">Create Account</Link>
      </div>
    </div>
  );
};

export default Header;
