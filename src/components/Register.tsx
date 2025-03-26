import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getApiBaseUrl } from '../helpers/GetApiBaseUrl.tsx';
import { TextField, Button, Grid, Typography, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system'; // Import styled from Material-UI

interface RegistrationFormData {
  email: string;
  password: string;
  nickname: string;
}

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
  padding: '20px',
});

const CardTitle = styled(Typography)({
  color: '#E73927', // Red color
  fontWeight: 'bold',
  textAlign: 'center',
});

const FormInput = styled(TextField)({
  fontFamily: "'Poppins', sans-serif",
  marginBottom: '16px',
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
  padding: '40px',
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

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: '',
    password: '',
    nickname: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      setLoading(false);
      return;
    }

    try {
      const apiUrl = getApiBaseUrl();
      const response = await axios.post(
        `${apiUrl}/usercenter/v2/register`,
        formData,
      );
      setLoading(false);
      setSuccess(true);
      setOpenSnackbar(true); // Show success snackbar
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message || 'An error occurred. Please try again.');
        console.error(err.response.data);
      } else {
        setError('Failed to register. Please try again.');
        console.error(err);
      }
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <BackgroundContainer>
      <Grid container spacing={2} justifyContent="center">
        {/* Left Column - Registration Form */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardTitle variant="h4">Register</CardTitle>
            <form onSubmit={handleSubmit}>
              <FormInput
                fullWidth
                label="Name"
                variant="outlined"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                required
                margin="normal"
              />
              <FormInput
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                margin="normal"
              />
              <FormInput
                fullWidth
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                margin="normal"
              />
              {error && <Typography color="error" variant="body2">{error}</Typography>}
              {success && <Typography color="success" variant="body2">Registration successful!</Typography>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                <BtnPrimary variant="contained" type="submit" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </BtnPrimary>
                <BtnSecondary variant="text" onClick={handleLoginRedirect}>
                  Login
                </BtnSecondary>
              </div>
            </form>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} sm={6} md={4}>
          <WelcomeTextContainer>
            <Logo src="/chstock4.ico" alt="Logo" />
            <WelcomeTitle variant="h3">
              Welcome to Cooking Master
            </WelcomeTitle>
            <Typography variant="body1" paragraph>
              A place to share and try out new recipes!
            </Typography>
            <Typography variant="body2" paragraph>
              Register to explore thousands of delicious dishes.
            </Typography>
          </WelcomeTextContainer>
        </Grid>
      </Grid>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={success ? "success" : "error"} sx={{ width: '100%' }}>
          {success ? "Registration successful!" : "An error occurred. Please try again."}
        </Alert>
      </Snackbar>
    </BackgroundContainer>
  );
};

export default Register;
