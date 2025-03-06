import React from 'react';

interface ShoppingListItemProps {
  item: string;
  onRemove: () => void;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = ({ item, onRemove }) => {
  return (
    <div style={styles.itemContainer}>
      <span style={styles.itemText}>{item}</span>
      <button onClick={onRemove} style={styles.removeButton}>
        Remove
      </button>
    </div>
  );
};

const styles = {
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.8rem 1.5rem',
    marginBottom: '0.8rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  itemText: {
    fontSize: '1.1rem',
    color: '#333',
  },
  removeButton: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#E73927', // The same color from the RecipeDetail component
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
};

// Optional: Add hover effect for the button
styles.removeButton[':hover'] = {
  backgroundColor: '#d63521', // Darker shade of the button color
};

export default ShoppingListItem;
