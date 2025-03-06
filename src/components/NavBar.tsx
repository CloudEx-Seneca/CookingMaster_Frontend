import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice.tsx';
import { RootState } from '../store/store.tsx';
import { useNavigate } from 'react-router-dom';
import { getApiBaseUrl } from '../helpers/GetApiBaseUrl.tsx';
import axios from 'axios';

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const apiUrl = getApiBaseUrl();
      if (refreshToken) {
        await axios.post(`${apiUrl}/usercenter/v1/user/logout`, { refresh_token: refreshToken });
      }

      dispatch(logout());
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');

      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Styles as a constant
  const styles = {
    navbar: {
      backgroundColor: '#E73927',
      padding: '1rem 2rem',
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    brand: {
      color: 'white',
      fontSize: '24px',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    navItems: {
      display: 'flex',
      alignItems: 'center',
    },
    navLinks: {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      gap: '20px',
    },
    navItem: {
      display: 'inline',
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '16px',
    },
    navLinkHover: {
      textDecoration: 'underline',
    },
    searchInput: {
      padding: '8px',
      fontSize: '16px',
      marginLeft: '15px',
      border: 'none',
      borderRadius: '4px',
      maxWidth: '250px',
    },
    searchInputFocus: {
      outline: 'none',
    },
    loginBtn: {
      padding: '8px 16px',
      color: '#E73927',
      backgroundColor: 'white',
      border: '1px solid #E73927',
      borderRadius: '4px',
      textDecoration: 'none',
    },
    loginBtnHover: {
      backgroundColor: '#E73927',
      color: 'white',
    },
    logoutBtn: {
      padding: '8px 16px',
      color: '#E73927',
      backgroundColor: 'white',
      border: '1px solid #E73927',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    logoutBtnHover: {
      backgroundColor: '#E73927',
      color: 'white',
    },
    // Responsive styles
    responsive: {
      '@media (max-width: 768px)': {
        navItems: {
          display: 'block',
        },
        navLinks: {
          display: 'block',
          textAlign: 'center',
        },
        searchInput: {
          marginTop: '10px',
          width: '100%',
        },
      },
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/home" style={styles.brand}>Cooking Master</Link>
        <div style={styles.navItems}>
          <ul style={styles.navLinks}>
            <li style={styles.navItem}>
              <Link to="/recipes" style={styles.navLink}>Recipes</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/shoppinglist" style={styles.navLink}>Shopping List</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/recipes/add" style={styles.navLink}>New Recipe</Link>
            </li>
            <li style={styles.navItem}>
              {!token ? (
                <Link to="/login" style={styles.loginBtn}>Login</Link>
              ) : (
                <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
