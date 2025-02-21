import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice.tsx';  // Import the logout action
import { RootState } from '../store/store.tsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Make sure axios is imported

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check if the user is logged in by looking at the token in Redux
  const token = useSelector((state: RootState) => state.auth.token);

  // Handle logout
  const handleLogout = async () => {
    try {
      // Get the refresh token from localStorage
      const refreshToken = localStorage.getItem('refreshToken');

      // If the refresh token exists, make the API call to log the user out
      if (refreshToken) {
        await axios.post('http://localhost:8888/usercenter/v1/user/logout', { refresh_token: refreshToken });
      }

      // Clear the user data from Redux
      dispatch(logout());

      // Remove tokens from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');

      // Redirect to the login page
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/home" className="nav-link">Home</Link>
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
        {token && (
          <li className="nav-item">
            <button className="nav-link" onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
