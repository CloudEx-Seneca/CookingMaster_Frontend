import React from 'react';
import ShoppingList from './ShoppingList.tsx';
import AddItemForm from './AddItemForm.tsx';

const ShoppingCart: React.FC = () => {
  return (
    <div className="app">
      <h1>Recipe Shopping List</h1>
      <AddItemForm onAdd={(item) => console.log(`Item added: ${item}`)} />
      <ShoppingList />
    </div>
  );
};

export default ShoppingCart;