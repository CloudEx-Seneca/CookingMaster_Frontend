import React from 'react';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

interface ShoppingListItemProps {
  item: string;
  onRemove: () => void;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = ({ item, onRemove }) => {
  return (
    <ItemContainer>
      <ItemText>{item}</ItemText>
      <RemoveButton onClick={onRemove}>
        <DeleteIcon sx={{ fontSize: 24 }} />
      </RemoveButton>
    </ItemContainer>
  );
};

// Styled components
const ItemContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.8rem 1.5rem',
  marginBottom: '0.8rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
});

const ItemText = styled(Typography)({
  fontSize: '1.1rem',
  color: '#333',
});

const RemoveButton = styled(IconButton)({
  backgroundColor: '#E73927',
  color: '#fff',
  borderRadius: '50%',
  padding: '8px',
  '&:hover': {
    backgroundColor: '#FFBB33',
  },
  transition: 'background-color 0.3s ease',
});

export default ShoppingListItem;
