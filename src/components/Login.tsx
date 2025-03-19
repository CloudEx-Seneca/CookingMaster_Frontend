import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../store/authSlice.tsx';
import { RootState } from '../store/store.tsx';
import { useNavigate } from 'react-router-dom';
import { getApiBaseUrl } from '../helpers/GetApiBaseUrl.tsx';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginBtnHover, setLoginBtnHover] = useState(false);
  const [signUpBtnHover, setSignUpBtnHover] = useState(false);

  const error = useSelector((state: RootState) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = getApiBaseUrl();
      const response = await axios.post(`${apiUrl}/usercenter/v2/login`, { email, password });

      const { token } = response.data.data;

      dispatch(loginSuccess(token));

      localStorage.setItem('authToken', token);

      setEmail('');
      setPassword('');
      setLoading(false);

      navigate('/recipes');
    } catch (err) {
      setLoading(false);

      if (err.response) {
        dispatch(loginFailure(err.response.data.msg || 'Login failed'));
      } else {
        dispatch(loginFailure('Network error. Please try again later.'));
      }
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div style={styles.backgroundContainer}>
      <div style={styles.loginContainer}>
        {/* Left Column - Login Form */}
        <div style={styles.formContainer}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h4 style={styles.cardHeaderText}>Login</h4>
            </div>
            <div style={styles.cardBody}>
              <form onSubmit={handleLogin}>
                <div style={styles.formGroup}>
                  <label htmlFor="email" style={styles.label}>Email</label>
                  <input
                    type="email"
                    id="email"
                    style={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div style={{ ...styles.formGroup, marginTop: '15px' }}>
                  <label htmlFor="password" style={styles.label}>Password</label>
                  <input
                    type="password"
                    id="password"
                    style={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p style={styles.error}>{error}</p>}
                <div style={styles.buttonContainer}>
                  <button
                    type="submit"
                    style={loginBtnHover ? { ...styles.btn, backgroundColor: '#FFBB33', color: 'white' } : styles.btn}
                    disabled={loading}
                    onMouseEnter={() => setLoginBtnHover(true)}
                    onMouseLeave={() => setLoginBtnHover(false)}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                  <button
                    type="button"
                    style={signUpBtnHover ? { ...styles.btn, backgroundColor: '#FFBB33', color: 'white' } : { ...styles.btn, backgroundColor: '#6c757d' }}
                    onClick={handleSignUpRedirect}
                    onMouseEnter={() => setSignUpBtnHover(true)}
                    onMouseLeave={() => setSignUpBtnHover(false)}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div style={styles.welcomeContainer}>
          <div style={styles.welcomeText}>
            <img src="/chstock4.ico" alt="Logo" style={styles.logo} />
            <h1 style={styles.welcomeTitle}>Welcome to Cooking Master</h1>
            <p style={styles.welcomeDescription}>A place to share and try out new recipes!</p>
            <p style={styles.welcomeSubDescription}>Sign in to explore thousands of delicious dishes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  backgroundContainer: {
    backgroundImage: 'url(/img/FoodBackground.jpg)',
    backgroundPosition: 'right center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    maxWidth: '1200px',
  },
  formContainer: {
    width: '35%',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  cardHeader: {
    backgroundColor: '#E73927',
    color: 'white',
    padding: '15px',
    textAlign: 'center',
    borderRadius: '8px 8px 0 0',
  },
  cardHeaderText: {
    fontFamily: "'Poppins', sans-serif", // Font family matching the navbar
    fontWeight: 'bold',
    fontSize: '24px',
  },
  cardBody: {
    padding: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
    display: 'block',
    fontFamily: "'Poppins', sans-serif", // Consistent font family
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    transition: 'border-color 0.3s ease',
    fontFamily: "'Poppins', sans-serif", // Font family for input fields
  },
  inputFocus: {
    borderColor: '#E73927',
    outline: 'none',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  btn: {
    padding: '10px 20px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#E73927',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: "'Poppins', sans-serif", // Font family for buttons
    fontWeight: '600',
  },
  welcomeContainer: {
    width: '55%',
    padding: '20px',
  },
  welcomeText: {
    color: 'white',
    textAlign: 'center',
    padding: '40px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  welcomeTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    fontFamily: "'Poppins', sans-serif", // Consistent font family
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
  },
  welcomeDescription: {
    fontSize: '18px',
    marginTop: '20px',
    fontFamily: "'Poppins', sans-serif", // Consistent font family
  },
  welcomeSubDescription: {
    fontSize: '16px',
    marginTop: '20px',
    fontFamily: "'Poppins', sans-serif", // Consistent font family
  },
  logo: {
    width: '100px', // Adjust the size as needed
    height: '100px',
    marginBottom: '20px', // Adds space between the logo and the title
  },
};

export default Login;
