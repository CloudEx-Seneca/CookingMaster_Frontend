import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Recipe } from '../types/Recipe';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getApiBaseUrlRec } from '../helpers/GetApiBaseUrl.tsx';
import RecipeImgUpload from './RecipeImgUpload.tsx';
import { TextField, Button, Typography, Grid, Card, CardContent, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';

interface EditRecipeFormProps {}

const Container = styled('div')({
  maxWidth: '800px',
  margin: '40px auto',
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const HeaderRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
});

const FormTitle = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#E73927',
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
});

const BackButton = styled(Button)({
  padding: '0.5rem 1rem',
  textTransform: 'none',
  backgroundColor: '#E73927',
  '&:hover': {
    backgroundColor: '#FFBB33',
  },
});

const ErrorMessage = styled(Snackbar)({
  marginBottom: '1rem',
});

const SuccessMessage = styled(Snackbar)({
  marginBottom: '1rem',
});

const RecipeCard = styled(Card)({
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const RecipeCardContent = styled(CardContent)({
  padding: '20px',
});

const FormGroup = styled('div')({
  marginBottom: '20px',
});

const IngredientButton = styled(Button)({
  padding: '0.5rem 1rem',
  backgroundColor: '#E73927',
  '&:hover': {
    backgroundColor: '#FFBB33',
  },
});

const DeleteButton = styled(Button)({
  padding: '0.5rem 1rem',
  backgroundColor: '#dc3545',
  '&:hover': {
    backgroundColor: '#FF6F61',
  },
});

const UpdateButton = styled(Button)({
  width: '100%',
  padding: '1rem',
  backgroundColor: '#E73927',
  '&:hover': {
    backgroundColor: '#FFBB33',
  },
});

const EditRecipeForm: React.FC<EditRecipeFormProps> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingRecipe, setExistingRecipe] = useState<Recipe | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const apiUrl = getApiBaseUrlRec();
        const token = localStorage.getItem('authToken');
        const uid = localStorage.getItem('userID');

        if (!token) {
          setError('Authentication token is missing.');
          return;
        }

        const response = await axios.get(`${apiUrl}/recipe/v2/detail/${id}`);
        if (response.status === 200) {
          const recipeData: Recipe = response.data.data;

          if (parseInt(uid, 10) !== recipeData.user_id) {
            navigate(`/recipes/${recipeData.id}`);
          }
          setExistingRecipe(recipeData);
          setName(recipeData.name);
          setIngredients(recipeData.ingredients.map((ingredient: any) => ingredient.name || ingredient));
          setDescription(recipeData.description);
          setImage(recipeData.image);
        } else {
          setError('Recipe not found.');
        }
      } catch (err) {
        setError('Failed to fetch recipe data.');
      }
    };

    fetchRecipe();
  }, [id]);

  const handleUpdateRecipe = async () => {
    if (!name.trim() || ingredients.some((ingredient) => ingredient.trim() === '') || !description.trim()) {
      setSuccessMessage('');
      setError('Please fill in all fields');
      return;
    }

    if (!image.trim()) {
      setSuccessMessage('');
      setError('Please upload an image');
      return;
    }

    const updatedRecipe: Recipe = {
      id: existingRecipe ? existingRecipe.id : '',
      name,
      ingredients: [...ingredients],
      description,
      image,
    };

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Authentication token is missing.');
        return;
      }

      const apiUrl = getApiBaseUrlRec();
      const response = await axios.post(
        `${apiUrl}/recipe/v2/update`,
        {
          ...updatedRecipe,
          recipe_id: parseInt(id, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.data.msg === 'success') {
        setSuccessMessage('Recipe updated successfully!');
        setError('');
        navigate(`/recipes/${id}`);
      } else {
        setError('Failed to update recipe. Please try again later.');
      }
    } catch (err) {
      setError('Failed to update recipe. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = e.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  const handleDeleteIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  return (
    <Container>
      <HeaderRow>
        <FormTitle>Edit Recipe</FormTitle>
        <StyledLink to={`/recipes/${id}`}>
          <BackButton variant="contained" color="error">
            Back to Recipe
          </BackButton>
        </StyledLink>
      </HeaderRow>

      {error && (
        <ErrorMessage open={true} autoHideDuration={6000}>
          <Alert severity="error">{error}</Alert>
        </ErrorMessage>
      )}

      {successMessage && (
        <SuccessMessage open={true} autoHideDuration={6000}>
          <Alert severity="success">{successMessage}</Alert>
        </SuccessMessage>
      )}

      <RecipeCard>
        <RecipeCardContent>
          <RecipeImgUpload image={image} onRecipeImgUrlChange={(url) => setImage(url)} />

          <TextField
            label="Recipe Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={formInputStyle}
          />

          <Typography variant="h6" color="textPrimary" gutterBottom>
            Ingredients
          </Typography>
          {ingredients.map((ingredient, index) => (
            <Grid container spacing={2} alignItems="center" key={index}>
              <Grid item xs={10}>
                <TextField
                  label={`Ingredient #${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(e, index)}
                  sx={formInputStyle}
                />
              </Grid>
              <Grid item xs={2}>
                <DeleteButton variant="contained" fullWidth onClick={() => handleDeleteIngredient(index)}>
                  Delete
                </DeleteButton>
              </Grid>
            </Grid>
          ))}
          <IngredientButton variant="contained" color="primary" onClick={handleAddIngredientField} sx={addIngredientButtonStyle}>
            Add Ingredient
          </IngredientButton>

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={formInputStyle}
          />

          <UpdateButton
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpdateRecipe}
            disabled={isSubmitting}
            sx={addRecipeButtonStyle}
          >
            {isSubmitting ? 'Submitting...' : 'Update Recipe'}
          </UpdateButton>
        </RecipeCardContent>
      </RecipeCard>
    </Container>
  );
};

// Styled components for consistent design
const formInputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  borderColor: '#ccc',
  borderRadius: '4px',
  marginBottom: '10px',
};

const addIngredientButtonStyle = {
  backgroundColor: '#E73927',
  color: 'white',
  marginTop: '10px',
  '&:hover': {
    backgroundColor: '#FFBB33',
  },
};

const addRecipeButtonStyle = {
  padding: '12px',
  backgroundColor: '#E73927',
  color: 'white',
  fontSize: '18px',
  '&:hover': {
    backgroundColor: '#FFBB33',
  },
};

export default EditRecipeForm;
