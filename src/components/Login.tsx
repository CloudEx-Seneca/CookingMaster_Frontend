import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../store/authSlice.tsx';
import { RootState } from '../store/store.tsx';
import { useNavigate } from 'react-router-dom';

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
      const response = await axios.post('http://localhost:8888/usercenter/v1/user/login', { email, password });

      // Assuming the response contains a token on successful login
      const token = response.data.token;

      // Dispatch the login success action with the token
      dispatch(loginSuccess(token));

      // Optionally, store the token in localStorage
      localStorage.setItem('authToken', token);

      // Clear the form and stop loading
      setEmail('');
      setPassword('');
      setLoading(false);

      // Redirect to the /home page after successful login
      navigate('/home');  // Redirects to the home page
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
