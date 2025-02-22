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
    <div className="container mt-5">
      <h2 className="mb-4">Add New Recipe</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="recipeTitle" className="form-label">Recipe Title</label>
            <input
              id="recipeTitle"
              type="text"
              className="form-control"
              placeholder="Enter recipe title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div className="input-group mb-2" key={index}>
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Ingredient #${index + 1}`}
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
              </div>
            ))}
            <div>
              <button
                type="button"
                className="btn btn-outline-primary mb-3"
                onClick={handleAddIngredientField}
              >
                Add Ingredient
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="instructions" className="form-label">Instructions</label>
            <textarea
              id="instructions"
              className="form-control"
              rows={4}
              placeholder="Enter cooking instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddIngredient}
          >
            Add Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
