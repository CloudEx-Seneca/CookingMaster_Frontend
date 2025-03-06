import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // For accessing the URL parameters
import { Recipe } from '../types/Recipe';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the id parameter from the URL
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    // Simulate fetching recipe details by id
    const fetchedRecipe: Recipe = {
      id: Number(id), // Assuming id is a number
      name: 'Spaghetti Carbonara',
      ingredients: ['Spaghetti', 'Eggs', 'Parmesan', 'Bacon', 'Garlic'],
      description: 'Boil pasta. Cook bacon. Mix eggs and cheese...',
      image: '/img/carbonara.jpeg',
      author: 'Chef John',
    };

    setRecipe(fetchedRecipe);
  }, [id]);

  if (!recipe) return <div>Loading...</div>; // Loading state

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={styles.title}>{recipe.name}</h2> {/* Updated to use name */}
        <Link to="/recipes" style={styles.addButton}>
          Back to Recipes
        </Link>
      </div>
      <div style={styles.imageWrapper}>
        <img src={recipe.image} alt={recipe.name} style={styles.image} /> {/* Updated to use name */}
      </div>

      <h4 style={styles.sectionTitle}>Ingredients:</h4>
      <ul style={styles.ingredientList}>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} style={styles.ingredientItem}>
            {ingredient}
          </li>
        ))}
      </ul>

      <h4 style={styles.sectionTitle}>Description:</h4> {/* Updated to use description */}
      <p style={styles.instructions}>{recipe.description}</p> {/* Updated to use description */}

      <p style={styles.author}>By: {recipe.author}</p>
    </div>
  );
};

// Inline styles
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
    marginBottom: '1rem',
  },
  imageWrapper: {
    marginBottom: '2rem',
  },
  image: {
    width: '100%',
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
    listStyleType: 'none',
    paddingLeft: '0',
    marginBottom: '1rem',
  },
  ingredientItem: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '0.5rem',
  },
  instructions: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '1.5rem',
  },
  author: {
    fontSize: '0.875rem',
    color: '#777',
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
