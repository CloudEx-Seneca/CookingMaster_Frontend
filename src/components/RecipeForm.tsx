import React, { useState } from 'react';
import axios from 'axios';
import { Recipe } from '../types/Recipe';
import { Link } from 'react-router-dom';
import { getApiBaseUrlRec } from '../helpers/GetApiBaseUrl.tsx';
import RecipeImgUpload from './RecipeImgUpload.tsx';

interface RecipeFormProps {
  onAddRecipe: (recipe: Recipe) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onAddRecipe }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');  // State for image URL
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddRecipe = async () => {
    if (!name.trim() || ingredients.some(ingredient => ingredient.trim() === '') || !description.trim()) {
      setSuccessMessage('');
      setError('Please fill in all fields');
      return;
    }

    if(!image.trim()) {
      setSuccessMessage('');
      setError('Please upload an image');
      return;
    }

    const newRecipe = {
      name,
      ingredients: [...ingredients],
      description,
      image, // Include the image URL in the recipe object
    };

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Authentication token is missing.');
        return;
      }

      const apiUrl = getApiBaseUrlRec();
      const response = await axios.post(
        `${apiUrl}/recipe/v2/create`,
        newRecipe,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.code === 200 || response.data.msg === "success") {
        setSuccessMessage('Recipe added successfully!');
        resetForm();
        setError('');
      } else {
        setError('Failed to add recipe. Please try again later.');
      }
    } catch (err) {
      console.error('Error:', err);
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
    setImage('');  // Reset the image URL after form submission
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '40px auto',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    formTitle: {
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#E73927',
    },
    errorMessage: {
      color: '#dc3545',
      backgroundColor: '#f8d7da',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '20px',
      fontSize: '14px',
    },
    successMessage: {  
      color: '#28a745',
      backgroundColor: '#d4edda',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '20px',
      fontSize: '16px',
      fontWeight: 'bold',
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
      marginBottom: '10px',
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
      transition: 'background-color 0.3s ease',
    },
    addIngredientBtnHover: {
      backgroundColor: '#FFBB33', // Hover color
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
      transition: 'background-color 0.3s ease',
    },
    addRecipeBtnHover: {
      backgroundColor: '#FFBB33', // Hover color
    },
    addButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#E73927',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      textDecoration: 'none',
      fontSize: '1rem',
      transition: 'background-color 0.3s ease',
    },
    addButtonHover: {
      backgroundColor: '#FFBB33', // Hover color
    },
    headerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h3 style={styles.formTitle}>Create a New Recipe</h3>
        <Link
          to="/recipes"
          style={styles.addButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.addButtonHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = styles.addButton.backgroundColor}
        >
          Back to Recipes
        </Link>
      </div>

      {error && <div style={styles.errorMessage}>{error}</div>}
      {successMessage && <div style={styles.successMessage}>{successMessage}</div>}

      <div style={styles.card}>
        <div style={styles.cardBody}>
          {/* Recipe Name */}
          <div style={styles.formGroup}>
            <RecipeImgUpload
              image={image}  // Pass the image state
              onRecipeImgUrlChange={(url) => setImage(url)}  // Handle image URL change
            />
            <label htmlFor="Name" style={styles.formLabel}>Recipe Name</label>
            <input
              id="Name"
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
            <label htmlFor="Description" style={styles.formLabel}>Description</label>
            <textarea
              id="Description"
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
