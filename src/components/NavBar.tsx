import React from 'react';
import { Link } from 'react-router-dom';

interface NavBarProps {
  
}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">About</Link>
        </li>
        <li className="nav-item">
          <Link to="/recipes" className="nav-link">Recipes</Link>
        </li>
        <li className="nav-item">
          <Link to="/shoppinglist" className="nav-link">Shopping Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;