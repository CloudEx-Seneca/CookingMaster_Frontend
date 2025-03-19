import React, { useState } from 'react';
import ShoppingListItem from './ShoppingListItem.tsx';

const ShoppingList: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>('');

  const addItem = (item: string) => {
    if (item) {
      setItems([...items, item]);
      setNewItem(''); // Clear input after adding
    }
  };

  const removeItem = (item: string) => {
    setItems(items.filter(i => i !== item));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Shopping List</h2>
      
      <div style={styles.card}>
        <div style={styles.cardBody}>
          <h5 style={styles.cardTitle}>Add Item</h5>
          <div style={styles.inputGroup}>
            <input
              type="text"
              style={styles.input}
              placeholder="Enter item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <button
              style={styles.addButton}
              onMouseEnter={(e) => e.currentTarget.style.color = 'blue'} 
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
              onClick={() => addItem(newItem)}
            >
              Add Item
            </button>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div style={styles.alert}>
          No items in the shopping list.
        </div>
      ) : (
        <div style={styles.list}>
          {items.map((item) => (
            <ShoppingListItem
              key={item}
              item={item}
              onRemove={() => removeItem(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#333',
  },
  card: {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
    marginBottom: '1.5rem',
    padding: '1rem',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    flexGrow: 1,
    marginRight: '0.5rem',
  },
  addButton: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#E73927', // Main color
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  alert: {
    padding: '1rem',
    backgroundColor: '#e9f7fe',
    color: '#31708f',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
};

export default ShoppingList;
