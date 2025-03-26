import React from 'react';
import { Recipe } from '../types/Recipe';
import { styled } from '@mui/system';
import { Chip, Typography } from '@mui/material';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const half = Math.ceil(recipe.ingredients.length / 2); // Split ingredients into two halves
  const firstHalf = recipe.ingredients.slice(0, half);
  const secondHalf = recipe.ingredients.slice(half);

  return (
    <Card>
      {/* Uniform image size */}
      <CardImage src={recipe.image} alt={recipe.name} />

      <CardBody>
        {/* Apply the orange color to the title */}
        <CardTitle>{recipe.name}</CardTitle>

        {/* Ingredients section in two columns */}
        <IngredientsContainer>
          <IngredientsColumn>
            <IngredientList>
              {firstHalf.map((ingredient, index) => (
                <IngredientItem key={index}>
                  <IngredientBadge label={ingredient.name} />
                </IngredientItem>
              ))}
            </IngredientList>
          </IngredientsColumn>
          <IngredientsColumn>
            <IngredientList>
              {secondHalf.map((ingredient, index) => (
                <IngredientItem key={index}>
                  <IngredientBadge label={ingredient.name} />
                </IngredientItem>
              ))}
            </IngredientList>
          </IngredientsColumn>
        </IngredientsContainer>

        {/* Recipe Instructions */}
        <CardText>{recipe.description}</CardText>

        {/* Author Info */}
        <CardAuthor>By: {recipe.author}</CardAuthor>
      </CardBody>
    </Card>
  );
};

// Styled components using Material UI's styled API
const Card = styled('div')({
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: '#fff',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const CardImage = styled('img')({
  height: '200px',
  objectFit: 'cover',
  width: '100%',
});

const CardBody = styled('div')({
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1,
});

const CardTitle = styled(Typography)({
  fontSize: '1.25rem',
  fontWeight: 'bold',
  marginBottom: '0.75rem',
  color: '#E73927',  // Recipe title in your custom orange color
});

const IngredientsContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const IngredientsColumn = styled('div')({
  width: '48%',
});

const IngredientList = styled('ul')({
  listStyleType: 'none',
  paddingLeft: 0,
});

const IngredientItem = styled('li')({
  marginBottom: '0.5rem',
});

const IngredientBadge = styled(Chip)({
  backgroundColor: '#FF7A47', // Light orange shade for badges
  color: '#fff',
  borderRadius: '20px',
  fontSize: '0.75rem', // Smaller font size
  padding: '0.25rem 0.5rem',  // Smaller padding
});

const CardText = styled('p')({
  marginTop: '1rem',
  fontSize: '1rem',
  color: '#333',
});

const CardAuthor = styled('p')({
  marginTop: '0.75rem',
  fontSize: '0.875rem',
  color: '#777',
});

export default RecipeCard;
