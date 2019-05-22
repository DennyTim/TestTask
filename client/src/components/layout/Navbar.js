import React from 'react';
import { Link } from 'react-router-dom';
import './layout.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="inner">
          <Link to="/" className="navbar-logo">
            <i className="far fa-play-circle"></i>
            <div className="navbar-logo-slogan">Films Info App</div>
          </Link>
          <div className="nav-elem">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/menu" className="navbar-link">Menu</Link>
            <Link to="/import" className="navbar-link">Import list</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
