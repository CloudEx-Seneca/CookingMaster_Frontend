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

  const error = useSelector((state: RootState) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();  // React Router's useNavigate hook for redirection

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = getApiBaseUrl();
      const response = await axios.post(`${apiUrl}/usercenter/v1/user/login`, { email, password });

      // Assuming the response contains the tokens on successful login
      const { access_token, refresh_token, access_expire, refresh_after } = response.data.data;

      // Dispatch the login success action with the access token
      dispatch(loginSuccess(access_token));

      // Store both access_token and refresh_token in localStorage
      localStorage.setItem('authToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      localStorage.setItem('accessExpire', access_expire.toString());
      localStorage.setItem('refreshAfter', refresh_after.toString());

      // Clear the form and stop loading
      setEmail('');
      setPassword('');
      setLoading(false);

      // Redirect to the /home page after successful login
      navigate('/');
    } catch (err) {
      setLoading(false);

      if (err.response) {
        // Dispatch the login failure action with an error message
        dispatch(loginFailure(err.response.data.message || 'Login failed'));
      } else {
        dispatch(loginFailure('Network error. Please try again later.'));
      }
    }
  };

  const handleSignUpRedirect = () => {
    // Redirect to the sign-up page
    navigate('/signup');
  };

  return (
    <div className="container-fluid" style={styles.backgroundContainer}>
      <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
        {/* Left Column - Login Form */}
        <div className="col-md-1">
        </div>
        <div className="col-md-3">
          <div className="card shadow-lg mt-5" style={styles.card}>
            <div className="card-header bg-primary text-white text-center">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email" className="text">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="password" className="text">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}
                <div className="d-flex justify-content-between mt-4">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleSignUpRedirect}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <div className="text-center text-white shadow-lg p-4 rounded" style={styles.welcomeText}>
            <h1 className="display-4 font-weight-bold">Welcome to Cooking Master</h1>
            <p className="lead mt-3">A place to share and try out new recipes!</p>
            <p className="text-light mt-3">Sign up to explore thousands of delicious dishes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline styles for background image and card
const styles = {
  backgroundContainer: {
    backgroundImage: 'url(/img/FoodBackground.jpg)',
    backgroundPosition: 'right center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Add a slight opacity to the card to ensure text readability
    borderRadius: '8px',
  },
  welcomeText: {
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)', // Adding text shadow for the welcome portion
  },
};

export default Login;
