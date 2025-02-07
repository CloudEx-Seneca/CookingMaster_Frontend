import React, { useState } from 'react';
import { Recipe } from '../types/Recipe';

interface RecipeFormProps {
  onAddRecipe: (recipe: Recipe) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onAddRecipe }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState('');

  const handleAddIngredient = () => {
    if (title && ingredients.length > 0 && instructions) {
      const newRecipe: Recipe = {
        id: Date.now(), // This can be adjusted to match a real ID mechanism
        title,
        ingredients,
        instructions,
      };
      onAddRecipe(newRecipe);
      setTitle('');
      setIngredients([]);
      setInstructions('');
    }
  };

  const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = e.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  return (
    <div className="recipe-form">
      <h2>Add New Recipe</h2>
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        {ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Ingredient #${index + 1}`}
            value={ingredient}
            onChange={(e) => handleIngredientChange(e, index)}
          />
        ))}
        <button onClick={handleAddIngredientField}>Add Ingredient</button>
      </div>
      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />
      <button onClick={handleAddIngredient}>Add Recipe</button>
    </div>
  );
};

export default RecipeForm;
