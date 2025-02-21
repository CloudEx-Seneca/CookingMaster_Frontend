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
      navigate('/home');
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

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
