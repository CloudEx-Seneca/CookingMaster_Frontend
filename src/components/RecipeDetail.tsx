import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { Recipe } from '../types/Recipe';
import { getApiBaseUrlRec } from '../helpers/GetApiBaseUrl.tsx';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the id parameter from the URL
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching data

        const apiUrl = getApiBaseUrlRec();
        // Replace with your actual API endpoint
        const response = await axios.get(
          `${apiUrl}/recipe/v2/detail/${id}`
        );
        setRecipe(response.data.data); // Set recipe data
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
        setIsLoading(false); // Ensure loading is stopped even on error
      }
    };

    fetchRecipe();
  }, [id]); // Refetch when the id changes

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
      <p style={styles.author}>By: {recipe.author}</p> {/* Author placed under title */}
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
    display: 'flex', // Apply flex display to the wrapper
    justifyContent: 'center', // Center the image horizontally
  },
  image: {
    width: '80%', // Set the width to 80% of the container
    height: 'auto', // Maintain aspect ratio
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
};

export default RecipeDetail;
