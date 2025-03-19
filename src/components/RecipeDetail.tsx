import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Recipe } from '../types/Recipe';
import { getApiBaseUrlRec } from '../helpers/GetApiBaseUrl.tsx';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the id parameter from the URL
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [isDeleting, setIsDeleting] = useState(false); // Track if deletion confirmation is shown
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const uid = parseInt(localStorage.getItem('userID'), 10);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching data
        const apiUrl = getApiBaseUrlRec();
        // Fetch recipe details from the API
        const response = await axios.get(`${apiUrl}/recipe/v2/detail/${id}`);
        setRecipe(response.data.data); // Set recipe data
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
        setIsLoading(false); // Ensure loading is stopped even on error
      }
    };

    fetchRecipe();
  }, [id]); // Refetch when the id changes

  const handleDelete = async () => {
    try {
      const apiUrl = getApiBaseUrlRec();
      const token = localStorage.getItem('authToken');

      await axios.post(
        `${apiUrl}/recipe/v2/delete`,
        { recipe_id: parseInt(id, 10) },  // Convert id to integer
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); // Call delete API
      
      navigate('/recipes'); // Redirect to the recipes list after successful deletion
    } catch (error) {
      console.error('Failed to delete recipe:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state until the data is fetched
  }

  if (!recipe) {
    return <div>Recipe not found!</div>; // Handle case where recipe is not found
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={styles.title}>{recipe.name}</h2>
        <Link to="/recipes" style={styles.addButton}>
          Back to Recipes
        </Link>
      </div>
      <p style={styles.author}>By: {recipe.author}</p>
      <div style={styles.imageWrapper}>
        <img src={recipe.image} alt={recipe.name} style={styles.image} />
      </div>

      <h4 style={styles.sectionTitle}>Ingredients:</h4>
      <div style={styles.ingredientList}>
        {recipe.ingredients.map((ingredient, index) => (
          <span key={index} style={styles.ingredientBadge}>
            {ingredient.name}
          </span>
        ))}
      </div>

      <h4 style={styles.sectionTitle}>Description:</h4>
      <p style={styles.instructions}>{recipe.description}</p>

      {uid===recipe.user_id ? (
      <div style={styles.buttonContainer}>
        <Link to={`/recipes/edit/${recipe.id}`} style={styles.editButton}>
          Edit Recipe
        </Link>

        {/* Delete Recipe Button */}
        {!isDeleting ? (
          <button onClick={() => setIsDeleting(true)} style={styles.deleteButton}>
            Delete Recipe
          </button>
        ) : (
          <div style={styles.confirmationContainer}>
            <span style={styles.confirmationText}>Are you sure?</span>
            <button onClick={handleDelete} style={styles.confirmButton}>
              Yes
            </button>
            <button onClick={() => setIsDeleting(false)} style={styles.cancelButton}>
              No
            </button>
          </div>
        )}
      </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#E73927', // The orange color you requested
    marginBottom: '0.5rem',
  },
  author: {
    fontSize: '1rem',
    color: '#777',
    marginTop: '0.5rem',
  },
  imageWrapper: {
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: 'auto',
    borderRadius: '8px',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '0.5rem',
  },
  ingredientList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  ingredientBadge: {
    backgroundColor: '#FF7A47', // Badge color
    color: '#fff',
    padding: '0.3rem 0.6rem',
    borderRadius: '20px',
    fontSize: '1rem',
  },
  instructions: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '1.5rem',
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
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  buttonContainer: {
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  editButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#FF7A47', // Matching color with ingredient label
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#F44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  confirmationContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    justifyContent: 'center',
  },
  confirmationText: {
    fontSize: '1rem',
    color: '#333',
  },
  confirmButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#FF7A47', // Matching color with ingredient label
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  cancelButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#888',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default RecipeDetail;
