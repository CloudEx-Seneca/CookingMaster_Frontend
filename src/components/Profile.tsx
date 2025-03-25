import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getApiBaseUrl } from '../helpers/GetApiBaseUrl.tsx';
import AvatarUpload from './AvatarUpload.tsx';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/system';

interface UserProfile {
  nickname: string;
  email: string;
  avatarUrl: string;
  info: string;
  userId: string;
  sex: string;
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
    sex: '',
  });

  const [isProfileUpdated, setIsProfileUpdated] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

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
      const response = await axios.get(
        `${apiUrl}/usercenter/v2/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = response.data.data;

      setUserData(user);
      setFormValues({
        nickname: user.nickname || '',
        email: user.email || '',
        avatarUrl: user.avatar_url || '',
        info: user.info || '',
        userId: user.id.toString(),
        sex: user.sex || 'Female',
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
        `${apiUrl}/usercenter/v2/profile`,
        { nickname, info, sex, avatar_url: avatarUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsProfileUpdated(true);
      setError(null);
      setOpenSnackbar(true);
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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <ProfileContainer>
      <ProfileHeader variant="h4" align="center" gutterBottom>
        My Profile
      </ProfileHeader>

      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AvatarUpload
              avatarUrl={formValues.avatarUrl}
              onAvatarUrlChange={(url) => setFormValues({ ...formValues, avatarUrl: url })}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            {/* Nickname */}
            <StyledTextField
              fullWidth
              label="Nickname"
              variant="outlined"
              value={formValues.nickname}
              onChange={(e) => setFormValues({ ...formValues, nickname: e.target.value })}
            />

            {/* Email (read-only) */}
            <StyledTextField
              fullWidth
              label="Email"
              variant="outlined"
              value={formValues.email}
              InputProps={{ readOnly: true }}
            />

            {/* User Information */}
            <StyledTextField
              fullWidth
              label="User Information"
              variant="outlined"
              multiline
              rows={4}
              value={formValues.info}
              onChange={(e) => setFormValues({ ...formValues, info: e.target.value })}
            />

            {/* Gender (Radio Buttons) */}
            <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
              <FormLabel component="legend" sx={{ color: '#E73927' }}>Gender</FormLabel>
              <RadioGroup
                row
                value={formValues.sex}
                onChange={(e) => setFormValues({ ...formValues, sex: e.target.value })}
              >
                <FormControlLabel value="Female" control={<Radio sx={{ color: '#E73927' }} />} label="Female" />
                <FormControlLabel value="Male" control={<Radio sx={{ color: '#E73927' }} />} label="Male" />
              </RadioGroup>
            </FormControl>

            {/* User ID (read-only) */}
            <StyledTextField
              fullWidth
              label="User ID"
              variant="outlined"
              value={formValues.userId}
              InputProps={{ readOnly: true }}
            />

            {/* Success or error messages */}
            {error && (
              <Alert severity="error" sx={{ marginBottom: 2, backgroundColor: '#f8d7da', color: '#dc3545' }}>
                {error}
              </Alert>
            )}
            {isProfileUpdated && !error && (
              <Alert severity="success" sx={{ marginBottom: 2, backgroundColor: '#d4edda', color: '#28a745' }}>
                Profile updated successfully!
              </Alert>
            )}

            {/* Submit Button */}
            <SubmitButton
              type="submit"
              variant="contained"
              fullWidth
            >
              Update Profile
            </SubmitButton>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar for success */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </ProfileContainer>
  );
};

// Styled Components
const ProfileContainer = styled(Box)({
  maxWidth: '800px',
  margin: '40px auto',
  padding: '3rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
});

const ProfileHeader = styled(Typography)({
  color: '#E73927',
});

const StyledTextField = styled(TextField)({
  marginBottom: '1.5rem',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: '#E73927',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#E73927',
    },
  },
});

const SubmitButton = styled(Button)({
  backgroundColor: '#E73927',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
});

export default ProfilePage;
