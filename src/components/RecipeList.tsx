import React, { useState, useEffect } from 'react';
import { Recipe } from '../types/Recipe';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard.tsx';
import axios from 'axios';
import { getApiBaseUrlRec } from '../helpers/GetApiBaseUrl.tsx';
import { styled } from '@mui/system';
import { Button, TextField, Grid, Typography, Chip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [titleSearch, setTitleSearch] = useState('');
  const [authorSearch, setAuthorSearch] = useState('');
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseEnter = (id: number) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('Authentication token is missing.');
          return;
        }
    
        const apiUrl = getApiBaseUrlRec();
        const response = await axios.get(
          `${apiUrl}/recipe/v2/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const fetchedRecipes = response.data.data;
        setRecipes(fetchedRecipes);
        setFilteredRecipes(fetchedRecipes);
        setLoading(false);
      } catch (err) {
        setError('Error fetching recipes');
        setLoading(false);
      }
    };

    fetchAdditionalData();
  }, []);

  useEffect(() => {
    const filterRecipes = () => {
      const filtered = recipes.filter((recipe) => {
        const matchesTitle = recipe.name.toLowerCase().includes(titleSearch.toLowerCase());
        const matchesAuthor = recipe.author.toLowerCase().includes(authorSearch.toLowerCase());
        const matchesIngredients = ingredientsList.every((ingredient) =>
          recipe.ingredients.some((ing) => ing.name.toLowerCase().includes(ingredient.toLowerCase()))
        );
        return matchesTitle && matchesIngredients && matchesAuthor;
      });

      setFilteredRecipes(filtered);
    };

    if (recipes.length > 0) {
      filterRecipes();
    }
  }, [titleSearch, authorSearch, ingredientsList, recipes]);

  const handleTitleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleSearch(event.target.value);
  };

  const handleAuthorSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorSearch(event.target.value);
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

  return (
    <Container>
      <HeaderRow>
        <Typography variant="h5">Search for Recipe</Typography>
        <Link to="/recipes/add" style={{ textDecoration: 'none' }}>
          <AddRecipeButton>
            <AddCircleOutlineIconStyled />
          </AddRecipeButton>
        </Link>
      </HeaderRow>

      <SearchColumn>
        <StyledTextField
          label="Search by recipe name..."
          value={titleSearch}
          onChange={handleTitleSearchChange}
        />
        <StyledTextField
          label="Search by author..."
          value={authorSearch}
          onChange={handleAuthorSearchChange}
        />
        <StyledTextField
          label="Add ingredient filter..."
          value={ingredientSearch}
          onChange={handleIngredientSearchChange}
        />
        <StyledButton onClick={handleAddIngredient}>Add Ingredient Filter</StyledButton>

        <IngredientList>
          {ingredientsList.map((ingredient, index) => (
            <IngredientChip key={index} label={ingredient} onDelete={() => handleRemoveIngredient(ingredient)} />
          ))}
        </IngredientList>
      </SearchColumn>

      <Grid container spacing={3}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
            <CardWrapper
              onMouseEnter={() => handleMouseEnter(recipe.id)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: hoveredCard === recipe.id ? 'scale(1.05)' : 'scale(1)',
                boxShadow: hoveredCard === recipe.id ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
              }}
            >
              <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none' }}>
                <RecipeCard recipe={recipe} />
              </Link>
            </CardWrapper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Styled components using MUI's styled API
const Container = styled('div')({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem 1rem',
});

const HeaderRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem',
});

const SearchColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginBottom: '2rem',
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc', // Light border color
    },
    '&:hover fieldset': {
      borderColor: '#E73927', // Red border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#E73927', // Focused border color
    },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#E73927',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: '#c43022',
  },
});

const AddRecipeButton = styled('div')({
  backgroundColor: '#E73927',
  padding: '0.8rem',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#c43022',
  },
});

const AddCircleOutlineIconStyled = styled(AddCircleOutlineIcon)({
  fontSize: '40px', // Reduced size
  color: 'white', // Ensuring the color is white
});


const IngredientList = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
});

const IngredientChip = styled(Chip)({
  backgroundColor: '#f1f1f1',
  fontSize: '0.9rem',
});

const CardWrapper = styled('div')({
  transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth animation
});

export default RecipeList;
