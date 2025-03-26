import React, { useState } from 'react';
import axios from 'axios';
import { Recipe } from '../types/Recipe';
import { Link } from 'react-router-dom';
import { getApiBaseUrlRec } from '../helpers/GetApiBaseUrl.tsx';
import RecipeImgUpload from './RecipeImgUpload.tsx';
import { Button, TextField, Box, Typography, IconButton, InputAdornment, CircularProgress, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

interface RecipeFormProps {
  onAddRecipe: (recipe: Recipe) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onAddRecipe }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(''); // State for image URL
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const handleAddRecipe = async () => {
    if (!name.trim() || ingredients.some(ingredient => ingredient.trim() === '') || !description.trim()) {
      setSnackbarMessage('Please fill in all fields');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!image.trim()) {
      setSnackbarMessage('Please upload an image');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const newRecipe = {
      name,
      ingredients: [...ingredients],
      description,
      image, // Include the image URL in the recipe object
    };

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem('authToken');
      if (!token) {
        setSnackbarMessage('Authentication token is missing.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      const apiUrl = getApiBaseUrlRec();
      const response = await axios.post(
        `${apiUrl}/recipe/v2/create`,
        newRecipe,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.code === 200 || response.data.msg === "success") {
        setSnackbarMessage('Recipe added successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        resetForm();
        setSuccessMessageVisible(true);
      } else {
        setSnackbarMessage('Failed to add recipe. Please try again later.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error('Error:', err);
      setSnackbarMessage('Failed to add recipe. Please try again later.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
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

  const resetForm = () => {
    setName('');
    setIngredients([]);
    setDescription('');
    setImage('');  // Reset the image URL after form submission
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <HeaderRow>
        <Title>Create a New Recipe</Title>
        <Link to="/recipes" style={backButtonStyle}>
          Back to Recipes
        </Link>
      </HeaderRow>

      <Card>
        <CardBody>
          {/* Recipe Name */}
          <FormGroup>
            <RecipeImgUpload
              image={image}  // Pass the image state
              onRecipeImgUrlChange={(url) => setImage(url)}  // Handle image URL change
            />
            <TextField
              label="Recipe Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={formInputStyle}
            />
          </FormGroup>

          {/* Ingredients Section */}
          <FormGroup>
            <Label>Ingredients</Label>
            {ingredients.map((ingredient, index) => (
              <IngredientInputGroup key={index}>
                <TextField
                  label={`Ingredient #${index + 1}`}
                  variant="outlined"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(e, index)}
                  fullWidth
                  sx={formInputStyle}
                />
                <IconButton
                  onClick={() => handleDeleteIngredient(index)}
                  sx={deleteButtonStyle}
                >
                  <DeleteIcon />
                </IconButton>
              </IngredientInputGroup>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddIngredientField}
              sx={addIngredientButtonStyle}
            >
              Add Ingredient
            </Button>
          </FormGroup>

          {/* Description Section */}
          <FormGroup>
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={formInputStyle}
            />
          </FormGroup>

          {/* Success Message Display */}
          {successMessageVisible && (
            <Alert sx={{ marginBottom: '20px' }}>
              Recipe added successfully!
            </Alert>
          )}

          {/* Add Recipe Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddRecipe}
            disabled={isSubmitting}
            sx={addRecipeButtonStyle}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Add Recipe'}
          </Button>
        </CardBody>
      </Card>

      {/* Snackbar for Success/Error Messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

// Styled components using @mui/system

const Container = styled(Box)({
  maxWidth: '800px',
  margin: '40px auto',
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const HeaderRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem',
});

const Title = styled(Typography)({
  fontWeight: 'bold',
  color: '#E73927',
});

const backButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#E73927',
  color: 'white',
  borderRadius: '4px',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: '#FFBB33',
  },
};

const Card = styled(Box)({
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
});

const CardBody = styled(Box)({
  padding: '20px',
});

const FormGroup = styled(Box)({
  marginBottom: '20px',
});

const Label = styled(Typography)({
  fontWeight: 600,
  marginBottom: '5px',
  display: 'block',
});

const IngredientInputGroup = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
});

const deleteButtonStyle = {
  marginLeft: '10px',
  color: '#dc3545',
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

const formInputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  borderColor: '#ccc',
  borderRadius: '4px',
  marginBottom: '10px',
};

export default RecipeForm;
