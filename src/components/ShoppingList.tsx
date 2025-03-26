import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShoppingListItem from './ShoppingListItem.tsx';
import { TextField, IconButton, Typography, Card, CardContent, Snackbar, Alert, Grid, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/system';
import { getApiBaseUrlShop } from '../helpers/GetApiBaseUrl.tsx';

const ShoppingList: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>(''); // State for success message
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false); // State for Snackbar open/close
  const apiUrl = getApiBaseUrlShop();
  const uid = localStorage.getItem('userID'); // Replace with dynamic user ID if needed

  // Fetch the shopping list when the component mounts
  useEffect(() => {
    fetchShoppingList();
  }, []);

  // Fetch shopping list from backend
  const fetchShoppingList = async () => {
    try {
      const response = await axios.get(`${getApiBaseUrlShop()}/shoppinglist/v1/get_list/${uid}`);
      setItems(response.data); // Set the shopping list items from the API
    } catch (err) {
      console.error('Error fetching shopping list:', err);
      setError('Failed to load shopping list.');
    }
  };

  // Add an item to the shopping list
  const addItem = async (item: string) => {
    if (item.trim()) {
      try {
        await axios.post(`${getApiBaseUrlShop()}/shoppinglist/v1/add_item`, {
          user_id: uid,
          ingredients: [item], // Send the new item as an array
        });
        setNewItem(''); // Clear the input field
        fetchShoppingList(); // Refresh the shopping list after adding the item
        setError(''); // Clear any previous errors
        setSuccessMessage('Item added successfully!'); // Set the success message
        setOpenSnackbar(true); // Show the Snackbar
      } catch (err) {
        console.error('Error adding item:', err);
        setError('Failed to add item.');
      }
    } else {
      setError('Item name cannot be empty!');
    }
  };

  // Remove an item from the shopping list
  const removeItem = async (item: string) => {
    try {
      await axios.post(`${apiUrl}/shoppinglist/v1/remove_item`, {
        user_id: uid,
        ingredients: [item], // Send the item to be removed as an array
      });
      fetchShoppingList(); // Refresh the shopping list after removing the item
      setSuccessMessage('Item removed successfully!'); // Set the success message
      setOpenSnackbar(true); // Show the Snackbar
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Failed to remove item.');
    }
  };

  // Handle Snackbar close event
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <HeaderRow>
        <FormTitle>My Shopping List</FormTitle>
      </HeaderRow>

      {error && (
        <ErrorMessage open={true} autoHideDuration={6000}>
          <Alert severity="error">{error}</Alert>
        </ErrorMessage>
      )}

      {successMessage && (
        <SuccessMessage>
          <Alert severity="success">{successMessage}</Alert>
        </SuccessMessage>
      )}

      <Card sx={cardStyle}>
        <CardContent>
          <Grid container spacing={2} alignItems="center" sx={inputGroupStyle}>
            <Grid item xs={10}>
              <TextField
                label="Enter item"
                variant="outlined"
                fullWidth
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                sx={formInputStyle}
              />
            </Grid>
            <Grid item xs={2}>
              <AddButton onClick={() => addItem(newItem)}>
                <AddCircleIcon sx={{ fontSize: 40 }} />
              </AddButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {items.length === 0 ? (
        <Alert sx={alertStyle} severity="info">
          No items in the shopping list.
        </Alert>
      ) : (
        <ItemList>
          {items.map((item) => (
            <ShoppingListItem key={item} item={item} onRemove={() => removeItem(item)} />
          ))}
        </ItemList>
      )}

      {/* Snackbar for success messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Snackbar will auto-hide after 3 seconds
        onClose={handleSnackbarClose}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

// Styled components for consistent design
const Container = styled('div')({
  maxWidth: '800px',
  margin: '40px auto',
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const HeaderRow = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
});

const FormTitle = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#E73927',
});

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: '1.5rem',
};

const inputGroupStyle = {
  display: 'flex',
  alignItems: 'center',
};

const formInputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  borderColor: '#ccc',
  borderRadius: '4px',
  marginBottom: '10px',
};

const AddButton = styled(IconButton)({
  backgroundColor: '#E73927',
  color: '#fff',
  borderRadius: '50%',
  padding: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#FFBB33',
  },
});

const ErrorMessage = styled(Snackbar)({
  marginBottom: '1rem',
});

const SuccessMessage = styled('div')({
  marginBottom: '1rem',
});

const alertStyle = {
  padding: '1rem',
  backgroundColor: '#fffae6',
  color: '#d9534f',
  borderRadius: '8px',
  fontSize: '1rem',
  marginBottom: '1rem',
};

const ItemList = styled('div')({
  listStyleType: 'none',
  paddingLeft: '0',
  marginTop: '1rem',
});

export default ShoppingList;
