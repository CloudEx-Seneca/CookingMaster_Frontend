import React, { useState, useEffect } from 'react';
import { Recipe } from '../types/Recipe';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard.tsx';

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [titleSearch, setTitleSearch] = useState('');
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);

  useEffect(() => {
    // Simulate fetching data
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

    // Set initial recipes and filteredRecipes state
    setRecipes(fetchedRecipes);
    setFilteredRecipes(fetchedRecipes); // Ensure filteredRecipes initially has all recipes
  }, []);

  useEffect(() => {
    const filterRecipes = () => {
      const filtered = recipes.filter((recipe) => {
        const matchesTitle = recipe.name.toLowerCase().includes(titleSearch.toLowerCase());
        const matchesIngredients = ingredientsList.every((ingredient) =>
          recipe.ingredients.some((ing) => ing.toLowerCase().includes(ingredient.toLowerCase()))
        );
        return matchesTitle && matchesIngredients;
      });

      setFilteredRecipes(filtered);
    };

    if (recipes.length > 0) {
      filterRecipes();
    }
  }, [titleSearch, ingredientsList, recipes]); // This ensures filter is applied when data changes

  const handleTitleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleSearch(event.target.value);
  };

  const handleIngredientSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientSearch(event.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredientSearch.trim() !== '') {
      setIngredientsList((prevList) => [...prevList, ingredientSearch.trim()]);
      setIngredientSearch('');
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredientsList((prevList) => prevList.filter((ing) => ing !== ingredient));
  };

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
    linkStyle: {
      textDecoration: 'none',
    },
    headerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
    },
    searchColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      marginBottom: '1.5rem',
    },
    searchInput: {
      padding: '0.5rem',
      marginBottom: '0.5rem',
      width: '100%',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    ingredientList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.25rem',
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
  };

  return (
    <div style={styles.container}>
      {/* Header Row with "Add New Recipe" button aligned to the right */}
      <div style={styles.headerRow}>
        <h3>Search for Recipe</h3>
        <Link to="/recipes/add" style={styles.addButton}>
          Add New Recipe
        </Link>
      </div>

      <div style={styles.searchColumn}>
        {/* Title Search Input */}
        <input
          type="text"
          placeholder="Search by recipe name..."
          value={titleSearch}
          onChange={handleTitleSearchChange}
          style={styles.searchInput}
        />

        {/* Ingredient Search Input */}
        <input
          type="text"
          placeholder="Add ingredient filter..."
          value={ingredientSearch}
          onChange={handleIngredientSearchChange}
          style={styles.searchInput}
        />
        <button onClick={handleAddIngredient} style={styles.searchInput}>
          Add Ingredient Filter
        </button>

        {/* Display added ingredients */}
        <div style={styles.ingredientList}>
          {ingredientsList.map((ingredient, index) => (
            <div key={index} style={styles.ingredientTag}>
              {ingredient}
              <span
                style={styles.removeButton}
                onClick={() => handleRemoveIngredient(ingredient)}
              >
                ×
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.grid}>
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} style={styles.cardWrapper}>
            <Link to={`/recipes/${recipe.id}`} style={styles.linkStyle}>
              <RecipeCard recipe={recipe} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
