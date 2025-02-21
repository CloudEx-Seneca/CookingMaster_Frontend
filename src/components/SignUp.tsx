import React, { useState } from 'react';
import axios from 'axios';
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
            'Content-Type': 'application/json'
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

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Registration successful!</div>}
    </div>
  );
};

export default SignUp;