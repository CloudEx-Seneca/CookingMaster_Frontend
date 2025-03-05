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
    <div className="card shadow-sm h-100">
      {/* Uniform image size */}
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        className="card-img-top" 
        style={{ height: '200px', objectFit: 'cover' }} 
      />
      <div className="card-body">
        <h5 className="card-title">{recipe.title}</h5>

        {/* Ingredients section in two columns */}
        <div className="row">
          <div className="col-6">
            <ul className="list-unstyled">
              {firstHalf.map((ingredient, index) => (
                <li key={index}>
                  <span className="badge bg-info">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-6">
            <ul className="list-unstyled">
              {secondHalf.map((ingredient, index) => (
                <li key={index}>
                  <span className="badge bg-info">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recipe Instructions */}
        <p className="card-text">{recipe.instructions}</p>

        {/* Author Info */}
        <p className="text-muted">By: {recipe.author}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
