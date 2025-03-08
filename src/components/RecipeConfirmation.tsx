import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeConfirmation: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/recipes');
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>The recipe was created!</h2>
      <p>Redirecting to the main page...</p>
    </div>
  );
};

export default RecipeConfirmation;