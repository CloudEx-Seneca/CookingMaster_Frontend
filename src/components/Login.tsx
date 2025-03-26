import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../store/authSlice.tsx';
import { RootState } from '../store/store.tsx';
import { useNavigate } from 'react-router-dom';
import { getApiBaseUrl } from '../helpers/GetApiBaseUrl.tsx';
import { TextField, Button, Grid, Typography, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';

// Styled components using @mui/system's styled API
const BackgroundContainer = styled('div')({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'url(/img/FoodBackground.jpg)', // Background image URL
  backgroundPosition: 'right center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
});

const Card = styled('div')({
  backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background for the form
  borderRadius: '8px',
  padding: '20px', // Adjusted padding to be similar to SignUp
});

const CardTitle = styled(Typography)({
  color: '#E73927', // Red color
  fontWeight: 'bold',
  textAlign: 'center',
});

const FormInput = styled(TextField)({
  fontFamily: "'Poppins', sans-serif",
  marginBottom: '16px',
  width: '100%',
});

const BtnPrimary = styled(Button)({
  backgroundColor: '#E73927',
  color: 'white',
  fontWeight: 'bold',
  fontFamily: "'Poppins', sans-serif",
  width: '100%',
  '&:hover': {
    backgroundColor: '#FFBB33',
  },
});

const BtnSecondary = styled(Button)({
  color: '#6c757d', // Default grey color
  fontFamily: "'Poppins', sans-serif",
  width: '100%',
  '&:hover': {
    color: '#FFBB33', // Hover effect for Login button
  },
});

const WelcomeTextContainer = styled('div')({
  color: 'white',
  textAlign: 'center',
  padding: '40px', // Similar padding as in SignUp
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  borderRadius: '8px',
});

const WelcomeTitle = styled(Typography)({
  fontFamily: "'Poppins', sans-serif",
  fontSize: '36px',
  fontWeight: 'bold',
  textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
});

const Logo = styled('img')({
  width: '100px',
  height: '100px',
  marginBottom: '20px',
});

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginBtnHover, setLoginBtnHover] = useState(false);
  const [signUpBtnHover, setSignUpBtnHover] = useState(false);

  const error = useSelector((state: RootState) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('error');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = getApiBaseUrl();
      const response = await axios.post(`${apiUrl}/usercenter/v2/login`, { email, password });

      const { token, user_id } = response.data.data;

      dispatch(loginSuccess(token));

      localStorage.setItem('authToken', token);
      localStorage.setItem('userID', user_id);

      setEmail('');
      setPassword('');
      setLoading(false);

      if (!token) {
        setLoading(false);
        return;
      }

      setSnackbarMessage('Login Successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      navigate('/recipes');
    } catch (err) {
      setLoading(false);

      if (err.response) {
        dispatch(loginFailure(err.response.data.msg || 'Login failed'));
        setSnackbarMessage(err.response.data.msg || 'Login failed');
      } else {
        dispatch(loginFailure('Network error. Please try again later.'));
        setSnackbarMessage('Network error. Please try again later.');
      }
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <BackgroundContainer>
      <Grid container spacing={2} justifyContent="center">
        {/* Left Column - Login Form */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardTitle variant="h4">Login</CardTitle>
            <form onSubmit={handleLogin}>
              <FormInput
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FormInput
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <Typography color="error" variant="body2" align="center">{error}</Typography>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                <BtnPrimary
                  type="submit"
                  disabled={loading}
                  onMouseEnter={() => setLoginBtnHover(true)}
                  onMouseLeave={() => setLoginBtnHover(false)}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </BtnPrimary>
                <BtnSecondary
                  type="button"
                  onClick={handleSignUpRedirect}
                  onMouseEnter={() => setSignUpBtnHover(true)}
                  onMouseLeave={() => setSignUpBtnHover(false)}
                >
                  Sign Up
                </BtnSecondary>
              </div>
            </form>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} sm={6} md={4}>
          <WelcomeTextContainer>
            <Logo src="/chstock4.ico" alt="Logo" />
            <WelcomeTitle variant="h3">Welcome to Cooking Master</WelcomeTitle>
            <Typography variant="body1" paragraph>
              A place to share and try out new recipes!
            </Typography>
            <Typography variant="body2" paragraph>
              Sign in to explore thousands of delicious dishes.
            </Typography>
          </WelcomeTextContainer>
        </Grid>
      </Grid>

      {/* Snackbar for displaying messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </BackgroundContainer>
  );
};

export default Login;
