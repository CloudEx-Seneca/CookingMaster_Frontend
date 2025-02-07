import React, { useState, useEffect } from 'react';
import { Recipe } from '../types/Recipe';
import RecipeCard from './RecipeCard.tsx';

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // You could fetch recipes from an API here
    const fetchedRecipes: Recipe[] = [
      {
        id: 1,
        title: 'Spaghetti Carbonara',
        ingredients: ['Spaghetti', 'Eggs', 'Parmesan', 'Bacon', 'Garlic'],
        instructions: 'Boil pasta. Cook bacon. Mix eggs and cheese...',
      },
      {
        id: 2,
        title: 'Vegetable Stir Fry',
        ingredients: ['Carrots', 'Broccoli', 'Peppers', 'Soy Sauce'],
        instructions: 'Stir-fry veggies and soy sauce until tender...',
      },
      {
        id: 3,
        title: 'Vegetable Stir Fry',
        ingredients: ['Carrots', 'Broccoli', 'Peppers', 'Soy Sauce'],
        instructions: 'Stir-fry veggies and soy sauce until tender...',
      },
    ];

    setRecipes(fetchedRecipes);
  }, []);

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
