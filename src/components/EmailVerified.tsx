import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmailVerified: React.FC = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Redirect after 3 seconds (3000 milliseconds)
    const timer = setTimeout(() => {
      navigate("/login"); // Redirects to the Login route
    }, 4000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.backgroundContainer}>
      <div style={styles.container}>
        <div style={styles.welcomeText}>
          <h1 style={styles.welcomeTitle}>Welcome to Cooking Master!</h1>
          <h2 style={styles.welcomeDescription}>Your email has been verified</h2>
          <p style={styles.welcomeSubDescription}>
            You will be redirected to the login page shortly...
          </p>
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
};

export default EmailVerified;
