import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice.tsx';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Icon for the hamburger menu
import { styled } from '@mui/system';

// Styled components using Material-UI's styled API
const Logo = styled('img')({
  width: '40px',
  height: '40px',
  marginRight: '10px',
});

const Brand = styled(Typography)({
  color: 'white',
  fontSize: '28px',
  fontWeight: 'bold',
  textDecoration: 'none',
  letterSpacing: '1px',
  textTransform: 'uppercase',
});

const NavLinks = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
});

const NavLink = styled(Button)({
  color: 'white',
  fontWeight: 600,
  fontSize: '16px',
  textDecoration: 'none',  // Remove underline on hover
  '&:hover': {
    color: '#FFBB33',  // Hover effect
    fontWeight: 700,
  },
});

const AuthButton = styled(Button)({
  padding: '8px 16px',
  borderRadius: '30px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  backgroundColor: 'white', // Highlight the button
  color: '#E73927',  // Set the text color
  border: '1px solid #E73927',  // Add border to match the theme
  '&:hover': {
    backgroundColor: '#FFBB33',  // Hover background color
    color: 'white',
  },
});

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false); // Drawer state for burger menu

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = async () => {
    try {
      dispatch(logout());
      localStorage.removeItem('authToken');
      localStorage.removeItem('userID');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const toggleDrawer = (open: boolean) => () => {
    setOpenDrawer(open);
  };

  const drawerLinks = (
    <Box sx={{ width: 250 }}>
      <List>
        <ListItem button component={Link} to="/recipes">
          <ListItemText primary="Recipes" />
        </ListItem>
        <ListItem button component={Link} to="/shoppinglist">
          <ListItemText primary="Shopping List" />
        </ListItem>
        <ListItem button component={Link} to="/profile">
          <ListItemText primary="My Profile" />
        </ListItem>

        {/* Auth Button for logout/login */}
        {!token ? (
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        ) : (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#E73927' }}>
      <Toolbar>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo src="/chstock4.ico" alt="Logo" />
            <Brand variant="h6">Cooking Master</Brand>
          </Box>

          {/* Nav Links for Desktop */}
          <NavLinks sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <NavLink component={Link} to="/recipes">
              Recipes
            </NavLink>
            <NavLink component={Link} to="/shoppinglist">
              Shopping List
            </NavLink>
            <NavLink component={Link} to="/profile">
              My Profile
            </NavLink>

            {/* Auth Buttons */}
            {!token ? (
              <NavLink component={Link} to="/login">
                Login
              </NavLink>
            ) : (
              <AuthButton onClick={handleLogout}>
                Logout
              </AuthButton>
            )}
          </NavLinks>

          {/* Hamburger Menu (Burger Icon) */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Container>
      </Toolbar>

      {/* Drawer for Burger Menu */}
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        {drawerLinks}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
