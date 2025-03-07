import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getApiBaseUrl } from '../helpers/GetApiBaseUrl.tsx';

interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  bio: string;
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch user data
  const fetchUserData = async () => {
    const apiUrl = getApiBaseUrl();
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No token generated/found. Please log in or sign up.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/usercenter/v1/user/detail`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in header
          },
        }
      );
      

      setUserData(response.data); 
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError('Failed to load profile data.');
      console.error('Error fetching user profile:', err);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  if (!userData) {
    return <div>No user data available.</div>;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>User Profile</h1>
      </header>

      <div style={styles.profileContainer}>
        <img
          src={userData.avatarUrl || '/img/default-avatar.png'}
          alt="User Avatar"
          style={styles.avatar}
        />
        <div style={styles.profileInfo}>
          <h2 style={styles.name}>{userData.nickname}</h2>
          <p style={styles.email}>{userData.email}</p>
          <p style={styles.bio}>{userData.info}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    borderRadius: '8px 8px 0 0',
  },
  headerTitle: {
    fontSize: '24px',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    marginRight: '20px',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontSize: '22px',
    fontWeight: 'bold',
  },
  email: {
    fontSize: '16px',
    color: '#555',
  },
  bio: {
    fontSize: '14px',
    color: '#777',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default ProfilePage;
