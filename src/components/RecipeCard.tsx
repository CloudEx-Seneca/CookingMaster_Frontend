import React from 'react';
import { Recipe } from '../types/Recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const half = Math.ceil(recipe.ingredients.length / 2); // Split ingredients into two halves
  const firstHalf = recipe.ingredients.slice(0, half);
  const secondHalf = recipe.ingredients.slice(half);

  return (
    <div style={styles.card}>
      {/* Uniform image size */}
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        style={styles.cardImage}
      />
      <div style={styles.cardBody}>
        <h5 style={styles.cardTitle}>{recipe.title}</h5>

        {/* Ingredients section in two columns */}
        <div style={styles.ingredientsContainer}>
          <div style={styles.ingredientsColumn}>
            <ul style={styles.ingredientList}>
              {firstHalf.map((ingredient, index) => (
                <li key={index} style={styles.ingredientItem}>
                  <span style={styles.ingredientBadge}>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={styles.ingredientsColumn}>
            <ul style={styles.ingredientList}>
              {secondHalf.map((ingredient, index) => (
                <li key={index} style={styles.ingredientItem}>
                  <span style={styles.ingredientBadge}>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recipe Instructions */}
        <p style={styles.cardText}>{recipe.instructions}</p>

        {/* Author Info */}
        <p style={styles.cardAuthor}>By: {recipe.author}</p>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  card: {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardImage: {
    height: '200px',
    objectFit: 'cover',
    width: '100%',
  },
  cardBody: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
  },
  ingredientsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  ingredientsColumn: {
    width: '48%',
  },
  ingredientList: {
    listStyleType: 'none',
    paddingLeft: 0,
  },
  ingredientItem: {
    marginBottom: '0.5rem',
  },
  ingredientBadge: {
    display: 'inline-block',
    padding: '0.25rem 0.5rem',  // Smaller padding
    backgroundColor: '#FF7A47', // Lighter orange shade
    color: '#fff',
    borderRadius: '20px',
    fontSize: '0.75rem',  // Smaller font size
  },
  cardText: {
    marginTop: '1rem',
    fontSize: '1rem',
    color: '#333',
  },
  cardAuthor: {
    marginTop: '0.75rem',
    fontSize: '0.875rem',
    color: '#777',
  },
};

export default RecipeCard;
