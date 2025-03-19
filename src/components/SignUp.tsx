import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getApiBaseUrl } from '../helpers/GetApiBaseUrl.tsx';

interface RegistrationFormData {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [btnHovered, setBtnHovered] = useState<boolean>(false); // Track hover state for Register button
  const [loginBtnHovered, setLoginBtnHovered] = useState<boolean>(false); // Track hover state for Login button
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
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setLoading(false);
      setSuccess(true);
      console.log(response.data); // Handle the successful registration
    } catch (err) {
      setLoading(false);

      if (err.response) {
        setError(err.response.data.msg || 'An error occurred. Please try again.');
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
    <div style={styles.backgroundContainer}>
      <div style={styles.loginContainer}>
        {/* Left Column - Registration Form */}
        <div style={styles.formContainer}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h4 style={styles.cardHeaderText}>Register</h4>
            </div>
            <div style={styles.cardBody}>
              <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                  <label htmlFor="email" style={styles.label}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    style={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="password" style={styles.label}>Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    style={styles.input}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>Registration successful!</p>}
                <div style={styles.buttonContainer}>
                  <button
                    type="submit"
                    style={{
                      ...styles.btn,
                      backgroundColor: btnHovered ? '#FFBB33' : '#E73927',
                    }} // Apply hover effect for Register button
                    disabled={loading}
                    onMouseEnter={() => setBtnHovered(true)}  // Trigger hover on mouse enter
                    onMouseLeave={() => setBtnHovered(false)}  // Revert back on mouse leave
                  >
                    {loading ? 'Registering...' : 'Register'}
                  </button>
                  <button
                    type="button"
                    style={{
                      ...styles.btn,
                      backgroundColor: loginBtnHovered ? '#FFBB33' : '#6c757d', // Apply hover effect for Login button
                    }}
                    onClick={handleLoginRedirect}
                    onMouseEnter={() => setLoginBtnHovered(true)}  // Trigger hover for Login button
                    onMouseLeave={() => setLoginBtnHovered(false)}  // Revert back on mouse leave
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={styles.welcomeContainer}>
          <div style={styles.welcomeText}>
            <img src="/chstock4.ico" alt="Logo" style={styles.logo} />
            <h1 style={styles.welcomeTitle}>Welcome to Cooking Master</h1>
            <p style={styles.welcomeDescription}>A place to share and try out new recipes!</p>
            <p style={styles.welcomeSubDescription}>Sign up to explore thousands of delicious dishes.</p>
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
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
  success: {
    color: 'green',
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

export default SignUp;
