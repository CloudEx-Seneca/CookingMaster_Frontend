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
        image: '/img/carbonara.jpeg',
        author: 'Chef John',
      },
      {
        id: 2,
        title: 'Vegetable Stir Fry',
        ingredients: ['Carrots', 'Broccoli', 'Peppers', 'Soy Sauce'],
        instructions: 'Stir-fry veggies and soy sauce until tender...',
        image: '/img/vegstirfry.jfif',
        author: 'Chef Jane',
      },
      {
        id: 3,
        title: 'Chicken Curry',
        ingredients: ['Chicken', 'Curry Powder', 'Coconut Milk', 'Onions'],
        instructions: 'Cook chicken, add curry powder and coconut milk...',
        image: '/img/chkcurry.jpg',
        author: 'Chef Tim',
      },
      {
        id: 4,
        title: 'Grilled Cheese Sandwich',
        ingredients: ['Bread', 'Cheese', 'Butter'],
        instructions: 'Butter bread, add cheese, and grill...',
        image: '/img/grilledcheese.jpg',
        author: 'Chef Anna',
      },
      {
        id: 5,
        title: 'Caesar Salad',
        ingredients: ['Lettuce', 'Caesar Dressing', 'Croutons', 'Parmesan'],
        instructions: 'Toss lettuce with Caesar dressing and add toppings...',
        image: '/img/caesarsalad.jpg',
        author: 'Chef Sarah',
      },
      {
        id: 6,
        title: 'Tacos',
        ingredients: ['Taco Shells', 'Ground Beef', 'Lettuce', 'Cheese', 'Salsa'],
        instructions: 'Cook beef, assemble tacos with toppings...',
        image: '/img/taco.jfif',
        author: 'Chef Mark',
      },
    ];

    setRecipes(fetchedRecipes);
  }, []);

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '1.5rem',
    },
    cardWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {recipes.map((recipe) => (
          <div key={recipe.id} style={styles.cardWrapper}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
