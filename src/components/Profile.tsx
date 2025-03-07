import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getApiBaseUrl } from '../helpers/GetApiBaseUrl.tsx';

interface UserProfile {
  nickname: string;
  email: string;
  avatarUrl: string;
  info: string;
  userId: string;
  sex: number;
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<UserProfile>({
    nickname: '',
    email: '',
    avatarUrl: '',
    info: '',
    userId: '',
    sex: 0,
  });

  const [isProfileUpdated, setIsProfileUpdated] = useState<boolean>(false);

  // Function to fetch user data
  const fetchUserData = async () => {
    const apiUrl = getApiBaseUrl();
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/usercenter/v1/user/detail`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Access the nested user data
      const user = response.data.data.user;

      setUserData(user);
      setFormValues({
        nickname: user.nickname || '',
        email: user.email || '',
        avatarUrl: user.avatar_url || '',
        info: user.info || '',
        userId: user.user_id.toString(),
        sex: user.sex || 0,
      });
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError('Failed to load profile data.');
      console.error('Error fetching user profile:', err);
    }
  };

  // Handle form value changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      sex: parseInt(e.target.value, 10),
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = getApiBaseUrl();
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    // Only send nickname, info, and sex in the update request
    const { nickname, info, sex } = formValues;

    try {
      await axios.post(
        `${apiUrl}/usercenter/v1/user/update`,
        { nickname, info, sex },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsProfileUpdated(true); // Set flag to true when profile is successfully updated
      setError(null); // Reset any previous errors
      setUserData({
        ...userData!,
        nickname,
        info,
        sex,
      }); // Update the userData state to reflect the new changes
    } catch (err: any) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h3 style={styles.formTitle}>My Profile</h3>
      </div>

      <form onSubmit={handleFormSubmit} style={styles.card}>
        <div style={styles.cardBody}>

          <div style={styles.avatarContainer}>
            <label htmlFor="avatarUrl" style={styles.label}>Avatar URL</label>
            <input
              id="avatarUrl"
              type="text"
              name="avatarUrl"
              placeholder="Avatar URL"
              value={formValues.avatarUrl}
              onChange={handleInputChange}
              style={styles.formInput}
            />
            <img
              src={formValues.avatarUrl || '/img/default-avatar.png'}
              alt="User Avatar"
              style={styles.avatar}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="nickname" style={styles.label}>Nickname</label>
            <input
              id="nickname"
              type="text"
              name="nickname"
              placeholder="Nickname"
              value={formValues.nickname}
              onChange={handleInputChange}
              style={styles.formInput}
            />

            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleInputChange}
              style={styles.formInput}
              disabled
            />

            <label htmlFor="info" style={styles.label}>User Information</label>
            <textarea
              id="info"
              name="info"
              placeholder="User Information"
              value={formValues.info}
              onChange={handleInputChange}
              style={styles.textarea}
            />
          </div>

          {/* Sex Radio Buttons */}
          <div style={styles.genderContainer}>
            <label htmlFor="sex" style={styles.label}>Gender</label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="sex"
                value="0"
                checked={formValues.sex === 0}
                onChange={handleSexChange}
              />
              Female
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="sex"
                value="1"
                checked={formValues.sex === 1}
                onChange={handleSexChange}
              />
              Male
            </label>
          </div>

          {/* Display userId as read-only */}
          <label htmlFor="userId" style={styles.label}>User ID</label>
          <input
            id="userId"
            type="text"
            name="userId"
            value={formValues.userId}
            readOnly
            style={styles.formInput}
            disabled
          />

          {/* Display success message if profile updated */}
          {isProfileUpdated && (
            <div style={styles.successMessage}>
              Profile updated successfully!
            </div>
          )}
          {/* Show error message */}
          {error && <div style={styles.errorMessage}>{error}</div>}

          <div style={styles.submitContainer}>
            <button type="submit" style={styles.submitButton}>Update Profile</button>
          </div>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  formTitle: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  errorMessage: {
    color: '#dc3545',
    backgroundColor: '#f8d7da',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  successMessage: {
    color: '#28a745',
    backgroundColor: '#d4edda',
    padding: '10px',
    borderRadius: '4px',
    marginTop: '20px',
    fontSize: '14px',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
  },
  cardBody: {
    padding: '20px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formInput: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  genderContainer: {
    marginBottom: '20px',
  },
  radioLabel: {
    marginRight: '10px',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
  },
  submitContainer: {
    marginTop: '20px',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#E73927',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default ProfilePage;
