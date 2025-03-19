import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Recipe } from '../types/Recipe';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getApiBaseUrlRec } from '../helpers/GetApiBaseUrl.tsx';
import RecipeImgUpload from './RecipeImgUpload.tsx';

interface EditRecipeFormProps {
}

const EditRecipeForm: React.FC<EditRecipeFormProps> = ({ }) => {
  const { id } = useParams<{ id: string }>(); // Get the id parameter from the URL
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingRecipe, setExistingRecipe] = useState<Recipe | null>(null); // New state for the recipe data
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch the recipe data when the component mounts
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const apiUrl = getApiBaseUrlRec();
        const token = localStorage.getItem('authToken');

        if (!token) {
          setError('Authentication token is missing.');
          return;
        }

        const response = await axios.get(`${apiUrl}/recipe/v2/detail/${id}`);
        if (response.status === 200) {
          const recipeData: Recipe = response.data.data; // Assuming the response contains the recipe object
          setExistingRecipe(recipeData);

          // Populate the form fields with the fetched recipe data
          setName(recipeData.name);

          // Handle ingredients: if they are objects, extract 'name' field
          const ingredients = recipeData.ingredients.map((ingredient: any) =>
            typeof ingredient === 'object' && ingredient.name ? ingredient.name : ingredient
          );
          setIngredients(ingredients);

          setDescription(recipeData.description);
          setImage(recipeData.image);
        } else {
          setError('Recipe not found.');
        }
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to fetch recipe data.');
      }
    };

    fetchRecipe();
  }, [id]); // Fetch the recipe again if the `id` changes

  // Handle the update recipe functionality
  const handleUpdateRecipe = async () => {
    console.log(ingredients);
    if (!name.trim() || ingredients.some((ingredient) => ingredient.trim() === '') || !description.trim()) {
      setSuccessMessage('');
      setError('Please fill in all fields');
      return;
    }

    const updatedRecipe: Recipe = {
      id: existingRecipe ? existingRecipe.id : '', // Ensure the ID is passed for the update
      name,
      ingredients: [...ingredients], // Copy the ingredients array
      description,
      image,
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
        `${apiUrl}/recipe/v2/update`, // Use PUT request to update
        { 
            ...updatedRecipe,
            recipe_id: parseInt(id, 10)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.data.msg === 'success') {
        setSuccessMessage('Recipe updated successfully!');
        setError('');
        navigate(`/recipes/${id}`)
      } else {
        setError('Failed to update recipe. Please try again later.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to update recipe. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle ingredient changes
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
    setImage('');
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
        <h3 style={styles.formTitle}>Edit Recipe</h3>
        <Link
          to="/recipes"
          style={styles.addButton}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.addButtonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.addButton.backgroundColor)}
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
              image={image} // Pass the image state
              onRecipeImgUrlChange={(url) => setImage(url)} // Handle image URL change
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
                  value={ingredient}  // Use 'ingredient' directly since it's now a string
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
                  onMouseEnter={(e) => (e.target.style.backgroundColor = styles.addIngredientBtnHover.backgroundColor)}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = styles.addIngredientBtn.backgroundColor)}
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              style={styles.addIngredientBtn}
              onClick={handleAddIngredientField}
              onMouseEnter={(e) => (e.target.style.backgroundColor = styles.addIngredientBtnHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = styles.addIngredientBtn.backgroundColor)}
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

          {/* Update Recipe Button */}
          <button
            type="button"
            style={styles.addRecipeBtn}
            onClick={handleUpdateRecipe}
            disabled={isSubmitting}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.addRecipeBtnHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.addRecipeBtn.backgroundColor)}
          >
            {isSubmitting ? 'Submitting...' : 'Update Recipe'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRecipeForm;
