import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Container } from '@mui/material';
import { styled } from '@mui/system';

const EmailVerified: React.FC = () => {
  const [buttonHover, setButtonHover] = useState(false); // To handle hover effect
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Redirect after 4 seconds (4000 milliseconds)
    const timer = setTimeout(() => {
      navigate('/login'); // Redirects to the Login route
    }, 4000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  // Function to handle manual redirection
  const handleRedirectNow = () => {
    navigate('/login');
  };

  return (
    <BackgroundContainer>
      <StyledContainer>
        <WelcomeText>
          <WelcomeTitle>Welcome to Cooking Master!</WelcomeTitle>
          <WelcomeDescription>Your email has been verified</WelcomeDescription>
          <WelcomeSubDescription>
            You will be redirected to the login page shortly...
          </WelcomeSubDescription>
          <RedirectButton
            onClick={handleRedirectNow}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            hover={buttonHover}
          >
            Redirect Now
          </RedirectButton>
        </WelcomeText>
      </StyledContainer>
    </BackgroundContainer>
  );
};

// Styled components
const BackgroundContainer = styled(Box)({
  backgroundImage: 'url(/img/FoodBackground.jpg)', // Keep consistent background
  backgroundPosition: 'right center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledContainer = styled(Container)({
  maxWidth: '50%',
  padding: '20px',
});

const WelcomeText = styled(Box)({
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  padding: '40px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  textAlign: 'center',
});

const WelcomeTitle = styled(Typography)({
  color: 'white',
  fontWeight: 'bold',
  fontFamily: "'Poppins', sans-serif",
  textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
  fontSize: '36px',
});

const WelcomeDescription = styled(Typography)({
  color: 'white',
  marginTop: '20px',
  fontFamily: "'Poppins', sans-serif",
  fontSize: '18px',
});

const WelcomeSubDescription = styled(Typography)({
  color: 'white',
  marginTop: '20px',
  fontFamily: "'Poppins', sans-serif",
  fontSize: '16px',
});

const RedirectButton = styled(Button)<{ hover: boolean }>(({ hover }) => ({
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: hover ? '#FFBB33' : '#E73927',
  color: 'white',
  borderRadius: '4px',
  fontWeight: '600',
  fontSize: '14px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#FFBB33',
  },
}));

export default EmailVerified;
