import React from 'react';

interface ShoppingListItemProps {
  item: string;
  onRemove: () => void;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = ({ item, onRemove }) => {
  return (
    <div className="shopping-list-item">
      <span>{item}</span>
      <button onClick={onRemove} style={{ marginLeft: '10px' }}>
        Remove
      </button>
    </div>
  );
};

export default ShoppingListItem;
