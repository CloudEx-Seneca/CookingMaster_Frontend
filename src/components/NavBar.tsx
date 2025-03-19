import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice.tsx';
import { useNavigate } from 'react-router-dom';
// import { getApiBaseUrl } from '../helpers/GetApiBaseUrl.tsx';
// import axios from 'axios';

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = async () => {
    try {
      /*
       const apiUrl = getApiBaseUrl();
      if (token) {
        await axios.post(`${apiUrl}/usercenter/v1/user/logout`, { refresh_token: refreshToken });
      }
      */

      dispatch(logout());
      localStorage.removeItem('authToken');
      localStorage.removeItem('userID');

      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const styles = {
    navbar: {
      backgroundColor: '#E73927',
      padding: '1rem 2rem',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: '0',
      zIndex: '1000',
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    brand: {
      display: 'flex',
      alignItems: 'center', 
      color: 'white',
      fontSize: '28px',
      fontWeight: 'bold',
      textDecoration: 'none',
      letterSpacing: '1px',
      marginTop: '10px',
      textTransform: 'uppercase',
    },
    logo: {
      width: '40px', // Adjust size of the logo as needed
      height: '40px',
      marginRight: '10px', // Space between logo and text
      marginBottom: '12px',
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
      gap: '30px',
    },
    navItem: {
      display: 'inline',
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'color 0.3s ease, text-decoration 0.3s ease',
    },
    navLinkHover: {
      color: '#FFBB33',
      textDecoration: 'underline',
      fontWeight: '700',
    },
    searchInput: {
      padding: '8px 15px',
      fontSize: '16px',
      borderRadius: '4px',
      border: 'none',
      maxWidth: '250px',
      marginLeft: '15px',
      outline: 'none',
    },
    searchInputFocus: {
      outline: 'none',
    },
    loginBtn: {
      padding: '8px 16px',
      color: '#E73927',
      backgroundColor: 'white',
      border: '1px solid #E73927',
      borderRadius: '30px',
      fontWeight: 'bold',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
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
      borderRadius: '30px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
    },
    logoutBtnHover: {
      backgroundColor: '#FFBB33',
      color: 'white',
    },
    responsive: {
      '@media (max-width: 768px)': {
        navItems: {
          display: 'block',
        },
        navLinks: {
          display: 'block',
          textAlign: 'center',
          marginTop: '10px',
        },
        searchInput: {
          marginTop: '10px',
          width: '100%',
        },
        container: {
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
      },
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.brand}>
          <img src="/chstock4.ico" alt="Logo" style={styles.logo} /> {/* Add your logo image here */}
          <p>Cooking Master</p>
        </div>
        <div style={styles.navItems}>
          <ul style={styles.navLinks}>
            <li style={styles.navItem}>
              <Link 
                to="/recipes" 
                style={styles.navLink} 
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFBB33'} 
                onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
              >
                Recipes
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link 
                to="/shoppinglist" 
                style={styles.navLink} 
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFBB33'} 
                onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
              >
                Shopping List
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link 
                to="/profile" 
                style={styles.navLink} 
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFBB33'} 
                onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
              >
                My Profile
              </Link>
            </li>
            <li style={styles.navItem}>
              {!token ? (
                <Link 
                  to="/login" 
                  style={styles.loginBtn} 
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E73927'} 
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  Login
                </Link>
              ) : (
                <button 
                  style={styles.logoutBtn} 
                  onClick={handleLogout} 
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFBB33'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
