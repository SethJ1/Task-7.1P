import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <a href="#">Devlink Marketplace</a>
      <div className="header-links">
        <a href="#">Find DEV</a>
        <a href="#">Find Jobs</a>
        <a href="#">Login</a>
        <a href="#">Create Account</a>
      </div>
    </div>
  );
};

export default Header;
