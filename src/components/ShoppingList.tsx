import React, { useState } from 'react';
import ShoppingListItem from './ShoppingListItem.tsx';

const ShoppingList: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);

  const addItem = (item: string) => {
    setItems([...items, item]);
  };

  const removeItem = (item: string) => {
    setItems(items.filter(i => i !== item));
  };

  return (
    <div className="shopping-list">
      <h2>Shopping List</h2>
      <div>
        {items.length === 0 ? (
          <p>No items in the shopping list</p>
        ) : (
          items.map(item => (
            <ShoppingListItem key={item} item={item} onRemove={() => removeItem(item)} />
          ))
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
