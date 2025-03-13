import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getApiBaseUrl } from '../helpers/GetApiBaseUrl.tsx';
import AvatarUpload from './AvatarUpload.tsx';

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

  // Fetch user data from API
  const fetchUserData = async () => {
    const apiUrl = getApiBaseUrl();
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${apiUrl}/usercenter/v1/user/detail`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  // Handle form submission (update profile)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = getApiBaseUrl();
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    const { nickname, info, sex, avatarUrl } = formValues;

    try {
      await axios.post(
        `${apiUrl}/usercenter/v1/user/update`,
        { nickname, info, sex, avatar_url: avatarUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsProfileUpdated(true);
      setError(null);
      if (userData) {
        setUserData({
          ...userData,
          nickname,
          info,
          sex,
          avatarUrl: avatarUrl,
        });
      }
    } catch (err: any) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    }
  };

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const containerName = 'avatars'; // Your container name in Azure Blob Storage

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h3 style={styles.formTitle}>My Profile</h3>
      </div>

      <form onSubmit={handleFormSubmit} style={styles.card}>
        <div style={styles.cardBody}>
          {/* Avatar upload section */}
          <AvatarUpload
            avatarUrl={formValues.avatarUrl}
            onAvatarUrlChange={(url) => setFormValues({ ...formValues, avatarUrl: url })}
          />

          {/* Other form fields */}
          <div style={styles.formGroup}>
            <label htmlFor="nickname" style={styles.label}>Nickname</label>
            <input
              id="nickname"
              type="text"
              name="nickname"
              placeholder="Nickname"
              value={formValues.nickname}
              onChange={(e) => setFormValues({ ...formValues, nickname: e.target.value })}
              style={styles.formInput}
            />

            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
              style={styles.formInput}
              disabled
            />

            <label htmlFor="info" style={styles.label}>User Information</label>
            <textarea
              id="info"
              name="info"
              placeholder="User Information"
              value={formValues.info}
              onChange={(e) => setFormValues({ ...formValues, info: e.target.value })}
              style={styles.textarea}
            />
          </div>

          {/* Gender radio buttons */}
          <div style={styles.genderContainer}>
            <label htmlFor="sex" style={styles.label}>Gender</label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="sex"
                value="0"
                checked={formValues.sex === 0}
                onChange={(e) => setFormValues({ ...formValues, sex: parseInt(e.target.value, 10) })}
              />
              Female
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="sex"
                value="1"
                checked={formValues.sex === 1}
                onChange={(e) => setFormValues({ ...formValues, sex: parseInt(e.target.value, 10) })}
              />
              Male
            </label>
          </div>

          {/* User ID field */}
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

          {/* Success or error messages */}
          {isProfileUpdated && (
            <div style={styles.successMessage}>
              Profile updated successfully!
            </div>
          )}
          {error && <div style={styles.errorMessage}>{error}</div>}

          {/* Submit button */}
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
  avatarImage: {
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
