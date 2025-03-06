import React, { useState } from 'react';
import axios from 'axios';
import { Recipe } from '../types/Recipe';

interface RecipeFormProps {
  onAddRecipe: (recipe: Recipe) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onAddRecipe }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddRecipe = async () => {
    if (!name.trim() || ingredients.some(ingredient => ingredient.trim() === '') || !description.trim()) {
      setError('Please fill in all fields, including at least one ingredient.');
      return;
    }

    // Create a new recipe object with additional properties
    const newRecipe = {
      "recipe": {
        // id: Date.now(), // Generate ID for now, or let the API assign one
        name,
        // ingredients,
        description,
        // image: '', // Placeholder image, can be empty or null if no image
        // author: [], // Empty array for authors, or undefined if not used
      }
    };

    try {
      setIsSubmitting(true);

      // Retrieve the token from localStorage (or other secure places)
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setError('Authentication token is missing.');
        return;
      }

      const response = await axios.post(
        'http://localhost:8889/recipe/v1/recipe/insertorupdate',
        newRecipe,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      if (response.status === 201) {
        // Assuming the response returns the new recipe object
        onAddRecipe(response.data);

        // Reset the form fields after successful submission
        resetForm();
        setError('');
      }
    } catch (err) {
      setError('Failed to add recipe. Please try again later.');
    } finally {
      setIsSubmitting(false);
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

  const handleDeleteIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const resetForm = () => {
    setName('');
    setIngredients([]);
    setDescription('');
  };

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
          {/* Recipe Name */}
          <div style={styles.formGroup}>
            <label htmlFor="recipeName" style={styles.formLabel}>Recipe Name</label>
            <input
              id="recipeName"
              type="text"
              style={styles.formInput}
              placeholder="Enter the name of the recipe here"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

          {/* Description Section */}
          <div style={styles.formGroup}>
            <label htmlFor="description" style={styles.formLabel}>Description</label>
            <textarea
              id="description"
              style={styles.formInput}
              rows={4}
              placeholder="Enter your cooking preparation instructions"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Add Recipe Button */}
          <button
            type="button"
            style={styles.addRecipeBtn}
            onClick={handleAddRecipe}
            disabled={isSubmitting}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.addRecipeBtnHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.addRecipeBtn.backgroundColor}
          >
            {isSubmitting ? 'Submitting...' : 'Add Recipe'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
