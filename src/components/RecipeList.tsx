import React, { useState, useEffect } from 'react';
import { Recipe } from '../types/Recipe';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard.tsx';

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [nameSearch, setNameSearch] = useState('');
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);

  useEffect(() => {
    const fetchedRecipes: Recipe[] = [
      {
        id: 1,
        name: 'Spaghetti Carbonara',
        ingredients: ['Spaghetti', 'Eggs', 'Parmesan', 'Bacon', 'Garlic'],
        description: 'Boil pasta. Cook bacon. Mix eggs and cheese...',
        image: '/img/carbonara.jpeg',
        author: 'Chef John',
      },
      {
        id: 2,
        name: 'Vegetable Stir Fry',
        ingredients: ['Carrots', 'Broccoli', 'Peppers', 'Soy Sauce'],
        description: 'Stir-fry veggies and soy sauce until tender...',
        image: '/img/vegstirfry.jfif',
        author: 'Chef Jane',
      },
      {
        id: 3,
        name: 'Chicken Curry',
        ingredients: ['Chicken', 'Curry Powder', 'Coconut Milk', 'Onions'],
        description: 'Cook chicken, add curry powder and coconut milk...',
        image: '/img/chkcurry.jpg',
        author: 'Chef Tim',
      },
      {
        id: 4,
        name: 'Grilled Cheese Sandwich',
        ingredients: ['Bread', 'Cheese', 'Butter'],
        description: 'Butter bread, add cheese, and grill...',
        image: '/img/grilledcheese.jpg',
        author: 'Chef Anna',
      },
      {
        id: 5,
        name: 'Caesar Salad',
        ingredients: ['Lettuce', 'Caesar Dressing', 'Croutons', 'Parmesan'],
        description: 'Toss lettuce with Caesar dressing and add toppings...',
        image: '/img/caesarsalad.jpg',
        author: 'Chef Sarah',
      },
      {
        id: 6,
        name: 'Tacos',
        ingredients: ['Taco Shells', 'Ground Beef', 'Lettuce', 'Cheese', 'Salsa'],
        description: 'Cook beef, assemble tacos with toppings...',
        image: '/img/taco.jfif',
        author: 'Chef Mark',
      },
    ];

    // Set initial recipes and filtered recipes to the fetched data
    setRecipes(fetchedRecipes);
    setFilteredRecipes(fetchedRecipes); // Show all recipes initially

  }, []);

  // Handle the change in name search
  const handleNameSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameSearch(event.target.value);
  };

  // Handle the change in ingredient search (for adding a new ingredient)
  const handleIngredientSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientSearch(event.target.value);
  };

  // Add ingredient to the list of filters
  const handleAddIngredient = () => {
    if (ingredientSearch.trim() !== '') {
      setIngredientsList((prevList) => [...prevList, ingredientSearch.trim()]);
      setIngredientSearch('');
    }
  };

  // Remove ingredient from the list of filters
  const handleRemoveIngredient = (ingredient: string) => {
    setIngredientsList((prevList) => prevList.filter((ing) => ing !== ingredient));
  };

  // Filter recipes based on both name and ingredients dynamically
  const filterRecipes = () => {
    const filtered = recipes.filter((recipe) => {
      const matchesName = recipe.name.toLowerCase().includes(nameSearch.toLowerCase());

      // Check if all ingredients in the list match any of the recipe's ingredients
      const matchesIngredients = ingredientsList.every((ingredient) =>
        recipe.ingredients.some((ing) => ing.toLowerCase().includes(ingredient.toLowerCase()))
      );

      // Only show recipes that match both search criteria
      return matchesName && matchesIngredients;
    });

    setFilteredRecipes(filtered);
  };

  // Use useEffect to run filter anytime nameSearch or ingredientsList changes
  useEffect(() => {
    // Apply filtering only if there are inputs to filter
    if (nameSearch || ingredientsList.length > 0) {
      filterRecipes();
    } else {
      setFilteredRecipes(recipes); // Reset to all recipes if no filter is applied
    }
  }, [nameSearch, ingredientsList, recipes]); // Add recipes as a dependency

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Adjust columns dynamically based on screen size
      gap: '1.5rem',
    },
    cardWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    linkStyle: {
      textDecoration: 'none', // Remove underline
    },
    searchColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem', // Reduced the gap between search fields
      marginBottom: '1.5rem', // Reduced the bottom margin for less spacing
    },
    searchInput: {
      padding: '0.5rem',
      marginBottom: '0.5rem', // Reduced margin between the inputs
      width: '100%',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    addIngredientButton: {
      padding: '0.5rem',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    ingredientList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.25rem', // Reduced the gap between ingredient tags
    },
    ingredientTag: {
      backgroundColor: '#f1f1f1',
      padding: '0.3rem 0.6rem',
      borderRadius: '12px',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
    },
    removeButton: {
      marginLeft: '0.5rem',
      cursor: 'pointer',
      color: 'red',
