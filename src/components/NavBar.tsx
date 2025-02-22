import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice.tsx'; // Import the logout action
import { RootState } from '../store/store.tsx';
import { useNavigate } from 'react-router-dom';
import { getApiBaseUrl } from '../helpers/GetApiBaseUrl.tsx';
import axios from 'axios'; // Make sure axios is imported

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Check if the user is logged in by looking at the token in Redux
  const token = useSelector((state: RootState) => state.auth.token);

  // Handle logout
  const handleLogout = async () => {
    try {
      // Get the refresh token from localStorage
      const refreshToken = localStorage.getItem('refreshToken');

      // If the refresh token exists, make the API call to log the user out
      const apiUrl = getApiBaseUrl();
      if (refreshToken) {
        await axios.post(`${apiUrl}/usercenter/v1/user/logout`, { refresh_token: refreshToken });
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

  // Handle the search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    // You can handle search functionality here, e.g., filtering recipes
  };

  return (
    <nav className="navbar bg-primary navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/home" className="navbar-brand text-white">Cooking Master</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/recipes" className="nav-link text-white">Recipes</Link>
            </li>
            <li className="nav-item">
              <Link to="/shoppinglist" className="nav-link text-white">Shopping List</Link>
            </li>
            <li className="nav-item">
              <Link to="/recipes/add" className="nav-link text-white">New Recipe</Link>
            </li>
            {/* Search bar */}
            <li className="nav-item">
              <input
                type="text"
                className="form-control"
                placeholder="Search Recipe"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ maxWidth: '250px' }} // Optional: make the search bar width smaller
              />
            </li>

            {/* Space between logout and search */}
            <li className="nav-item ms-3">
              {!token ? (
                <Link to="/login" className="btn btn-outline-light">Login</Link>
              ) : (
                <button className="btn btn-outline-light logout-btn" onClick={handleLogout}>Logout</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
