import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Recipe } from '../types/Recipe';
import { getApiBaseUrlRec } from '../helpers/GetApiBaseUrl.tsx';
import { styled } from '@mui/system';
import { Button, Typography, Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const uid = parseInt(localStorage.getItem('userID'), 10);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setIsLoading(true);
        const apiUrl = getApiBaseUrlRec();
        const response = await axios.get(`${apiUrl}/recipe/v2/detail/${id}`);
        setRecipe(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    try {
      const apiUrl = getApiBaseUrlRec();
      const token = localStorage.getItem('authToken');
      await axios.post(
        `${apiUrl}/recipe/v2/delete`,
        { recipe_id: parseInt(id, 10) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/recipes');
    } catch (error) {
      console.error('Failed to delete recipe:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!recipe) {
    return <div>Recipe not found!</div>;
  }

  return (
    <Container>
      <HeaderRow>
        <Title>{recipe.name}</Title>
        <ActionButtonsContainer>
          <BackButton to="/recipes">Back to Recipe List</BackButton>
          {uid === recipe.user_id && (
            <>
              <IconButton component={Link} to={`/recipes/edit/${recipe.id}`} aria-label="Edit Recipe">
                <EditIcon style={{ fontSize: 28, color: '#FF7A47' }} />
              </IconButton>
              {!isDeleting ? (
                <IconButton onClick={() => setIsDeleting(true)} aria-label="Delete Recipe">
                  <DeleteIcon style={{ fontSize: 28, color: '#F44336' }} />
                </IconButton>
              ) : (
                <ConfirmationContainer>
                  <ConfirmationText>Are you sure?</ConfirmationText>
                  <ConfirmButton onClick={handleDelete}>Yes</ConfirmButton>
                  <CancelButton onClick={() => setIsDeleting(false)}>No</CancelButton>
                </ConfirmationContainer>
              )}
            </>
          )}
        </ActionButtonsContainer>
      </HeaderRow>
      <Author>By: {recipe.author}</Author>
      <ImageWrapper>
        <RecipeImage src={recipe.image} alt={recipe.name} />
      </ImageWrapper>

      <SectionTitle>Ingredients:</SectionTitle>
      <IngredientList>
        {recipe.ingredients.map((ingredient, index) => (
          <IngredientBadge key={index} label={ingredient.name} />
        ))}
      </IngredientList>

      <SectionTitle>Description:</SectionTitle>
      <Instructions>{recipe.description}</Instructions>
    </Container>
  );
};

// Styled components using Material UI's styled API
const Container = styled('div')({
  maxWidth: '900px',
  margin: '0 auto',
  padding: '2rem',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Arial, sans-serif',
});

const HeaderRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem',
});

const Title = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#E73927',
  marginBottom: '0.5rem',
});

const ActionButtonsContainer = styled('div')({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
});

const BackButton = styled(Link)({
  padding: '0.5rem 1rem',
  backgroundColor: '#E73927',
  color: 'white',
  borderRadius: '4px',
  textDecoration: 'none',
  fontSize: '1rem',
});

const Author = styled('p')({
  fontSize: '1rem',
  color: '#777',
  marginTop: '0.5rem',
});

const ImageWrapper = styled('div')({
  marginBottom: '2rem',
  display: 'flex',
  justifyContent: 'center',
});

const RecipeImage = styled('img')({
  width: '80%',
  height: 'auto',
  borderRadius: '8px',
});

const SectionTitle = styled(Typography)({
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '0.5rem',
});

const IngredientList = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginBottom: '1rem',
});

const IngredientBadge = styled(Chip)({
  backgroundColor: '#FF7A47',
  color: '#fff',
  borderRadius: '20px',
  fontSize: '1rem',
  padding: '0.3rem 0.6rem',
});

const Instructions = styled('p')({
  fontSize: '1rem',
  color: '#333',
  marginBottom: '1.5rem',
});

const ConfirmationContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  justifyContent: 'center',
});

const ConfirmationText = styled('span')({
  fontSize: '1rem',
  color: '#333',
});

const ConfirmButton = styled(Button)({
  padding: '0.5rem 1rem',
  backgroundColor: '#FF7A47',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
});

const CancelButton = styled(Button)({
  padding: '0.5rem 1rem',
  backgroundColor: '#888',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
});

export default RecipeDetail;
