import React, { useState } from 'react';

interface AddItemFormProps {
  onAdd: (item: string) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAdd }) => {
  const [newItem, setNewItem] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newItem.trim()) {
      onAdd(newItem.trim());
      setNewItem(''); // Reset the input field after adding the item
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newItem}
        onChange={handleInputChange}
        placeholder="Enter item"
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
