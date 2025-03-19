import React, { useState, useEffect } from 'react';
import { Recipe } from '../types/Recipe';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard.tsx';
import axios from 'axios';
import { getApiBaseUrlRec } from '../helpers/GetApiBaseUrl.tsx';

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [titleSearch, setTitleSearch] = useState('');
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulated data
  const initialRecipes: Recipe[] = [
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

  useEffect(() => {
    // Simulating an API call with axios
    const fetchAdditionalData = async () => {
      try {
        // Replace with actual API endpoint
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('Authentication token is missing.');
          return;
        }
    
        const apiUrl = getApiBaseUrlRec();
        const response = await axios.get(
          //`http://localhost:8889/recipe/v1/recipe/list`,
          `${apiUrl}/recipe/v2/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const fetchedRecipes = response.data;

        // Append fetched data to the initial simulated data
        // setRecipes((prevRecipes) => [...prevRecipes, ...fetchedRecipes]);
        // setFilteredRecipes((prevRecipes) => [...prevRecipes, ...fetchedRecipes]);

        setLoading(false);
      } catch (err) {
        setError('Error fetching recipes');
        setLoading(false);
      }
    };

    // Set initial recipes from simulated data
    setRecipes(initialRecipes);
    setFilteredRecipes(initialRecipes); // Ensure filteredRecipes initially has all recipes

    // Fetch additional data from the API after setting initial data
    fetchAdditionalData();
  }, []);

  // Filtering recipes based on title and ingredients
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h3>Search for Recipe</h3>
        <Link to="/recipes/add" style={styles.addButton}>
          Add New Recipe
        </Link>
      </div>

      <div style={styles.searchColumn}>
        <input
          type="text"
          placeholder="Search by recipe name..."
          value={titleSearch}
          onChange={handleTitleSearchChange}
          style={styles.searchInput}
        />

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
