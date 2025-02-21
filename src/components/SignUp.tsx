import React, { useState } from 'react';
import axios from 'axios';
import { getApiBaseUrl } from '../helpers/GetApiBaseUrl.tsx';
import { useNavigate } from 'react-router-dom';

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
        `${apiUrl}/usercenter/v1/user/register`,
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
      setError('Failed to register. Please try again.');
      console.error(err);
    }
  };

  const handleLoginRedirect = () => {
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="container-fluid" style={styles.backgroundContainer}>
      <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
        {/* Left Column - Registration Form */}
        <div className="col-md-1"></div>
        <div className="col-md-3">
          <div className="card shadow-lg mt-5" style={styles.card}>
            <div className="card-header bg-primary text-white text-center">
              <h4>Register</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email" className="text">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="password" className="text">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}
                {success && <p className="text-success mt-2">Registration successful!</p>}
                <div className="d-flex justify-content-between mt-4">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleLoginRedirect}
                  >
                    Login
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
    backgroundImage: 'url(/img/FoodBackground.jpg)', // Replace with your image URL
    backgroundPosition: 'right center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slight opacity to ensure text readability
    borderRadius: '8px',
  },
  welcomeText: {
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)', // Adding text shadow for the welcome portion
  },
};

export default SignUp;
