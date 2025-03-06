import React, { useState } from 'react';
import { Recipe } from '../types/Recipe';

interface RecipeFormProps {
  onAddRecipe: (recipe: Recipe) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onAddRecipe }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState('');

  const handleAddRecipe = () => {
    if (!title || ingredients.some(ingredient => ingredient === '') || !instructions) {
      setError('Please fill in all fields, including at least one ingredient.');
      return;
    }
    const newRecipe: Recipe = {
      id: Date.now(),
      title,
      ingredients,
      instructions,
    };
    onAddRecipe(newRecipe);
    setTitle('');
    setIngredients(['']);
    setInstructions('');
    setError('');
  };

  const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = e.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  const handleDeleteIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  // Styles constant
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '40px auto',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
    },
    formTitle: {
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    errorMessage: {
      color: '#dc3545',
      backgroundColor: '#f8d7da',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '20px',
      fontSize: '14px',
    },
    card: {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
    },
    cardBody: {
      padding: '20px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    formLabel: {
      fontWeight: 600,
      marginBottom: '5px',
      display: 'block',
    },
    formInput: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    inputGroup: {
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
    },
    addIngredientBtn: {
      padding: '10px 20px',
      backgroundColor: '#E73927',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    addIngredientBtnHover: {
      backgroundColor: '#c5281d',
    },
    addRecipeBtn: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#E73927',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '18px',
      cursor: 'pointer',
    },
    addRecipeBtnHover: {
      backgroundColor: '#c5281d',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.formTitle}>Adding a New Recipe</h2>

      {error && <div style={styles.errorMessage}>{error}</div>}

      <div style={styles.card}>
        <div style={styles.cardBody}>
          {/* Recipe Title */}
          <div style={styles.formGroup}>
            <label htmlFor="recipeTitle" style={styles.formLabel}>Recipe Title</label>
            <input
              id="recipeTitle"
              type="text"
              style={styles.formInput}
              placeholder="Enter the name of the recipe here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Ingredients Section */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} style={styles.inputGroup}>
                <input
                  type="text"
                  style={styles.formInput}
                  placeholder={`Ingredient #${index + 1}`}
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
                {/* Delete Button */}
                <button
                  type="button"
                  style={{
                    ...styles.addIngredientBtn,
                    backgroundColor: '#dc3545',
                    marginLeft: '10px',
                  }}
                  onClick={() => handleDeleteIngredient(index)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = styles.addIngredientBtnHover.backgroundColor}
                  onMouseLeave={(e) => e.target.style.backgroundColor = styles.addIngredientBtn.backgroundColor}
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              style={styles.addIngredientBtn}
              onClick={handleAddIngredientField}
              onMouseEnter={(e) => e.target.style.backgroundColor = styles.addIngredientBtnHover.backgroundColor}
              onMouseLeave={(e) => e.target.style.backgroundColor = styles.addIngredientBtn.backgroundColor}
            >
              Add Ingredient
            </button>
          </div>

          {/* Instructions Section */}
          <div style={styles.formGroup}>
            <label htmlFor="instructions" style={styles.formLabel}>Instructions</label>
            <textarea
              id="instructions"
              style={styles.formInput}
              rows={4}
              placeholder="Enter your cooking preparation instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          {/* Add Recipe Button */}
          <button
            type="button"
            style={styles.addRecipeBtn}
            onClick={handleAddRecipe}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.addRecipeBtnHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.addRecipeBtn.backgroundColor}
          >
            Add Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
