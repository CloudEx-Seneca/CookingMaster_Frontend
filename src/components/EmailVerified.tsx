import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailVerified: React.FC = () => {
  const [buttonHover, setButtonHover] = useState(false); // To handle hover effect
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Redirect after 4 seconds (4000 milliseconds)
    const timer = setTimeout(() => {
      navigate("/login"); // Redirects to the Login route
    }, 4000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  // Function to handle manual redirection
  const handleRedirectNow = () => {
    navigate("/login");
  };

  return (
    <div style={styles.backgroundContainer}>
      <div style={styles.container}>
        <div style={styles.welcomeText}>
          <h1 style={styles.welcomeTitle}>Welcome to Cooking Master!</h1>
          <h2 style={styles.welcomeDescription}>Your email has been verified</h2>
          <p style={styles.welcomeSubDescription}>
            You will be redirected to the login page shortly...
          </p>
          <button
            style={buttonHover ? { ...styles.redirectButton, backgroundColor: '#FFBB33', color: 'white' } : styles.redirectButton}
            onClick={handleRedirectNow}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
          >
            Redirect Now
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  backgroundContainer: {
    backgroundImage: 'url(/img/FoodBackground.jpg)', // Keep consistent background
    backgroundPosition: 'right center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '50%',
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
    fontFamily: "'Poppins', sans-serif",
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
  },
  welcomeDescription: {
    fontSize: '18px',
    marginTop: '20px',
    fontFamily: "'Poppins', sans-serif",
  },
  welcomeSubDescription: {
    fontSize: '16px',
    marginTop: '20px',
    fontFamily: "'Poppins', sans-serif",
  },
  redirectButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#E73927',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: '600',
  },
};

export default EmailVerified;
