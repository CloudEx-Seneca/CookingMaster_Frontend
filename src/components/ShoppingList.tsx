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
    <div className="container mt-5">
      <h2 className="mb-4">My Shopping List</h2>
      
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">Add Item</h5>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <button
              className="btn btn-outline-primary"
              onClick={() => addItem(newItem)}
            >
              Add Item
            </button>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No items in the shopping list.
        </div>
      ) : (
        <div className="list-group">
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

export default ShoppingList;
