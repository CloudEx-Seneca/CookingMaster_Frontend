import React, { useState } from 'react';
import ShoppingListItem from './ShoppingListItem.tsx';
import { TextField, IconButton, Typography, Card, CardContent, Snackbar, Alert, Grid, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/system';

const ShoppingList: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const [error, setError] = useState<string>('');

  const addItem = (item: string) => {
    if (item.trim()) {
      setItems([...items, item]);
      setNewItem('');
      setError('');
    } else {
      setError('Item name cannot be empty!');
    }
  };

  const removeItem = (item: string) => {
    setItems(items.filter(i => i !== item));
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
