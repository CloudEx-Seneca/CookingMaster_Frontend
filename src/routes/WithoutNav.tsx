import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const WithoutNav: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // If token is found, redirect to /recipes
      navigate('/recipes');
    }
  }, [navigate]);

  return <Outlet />;
};

export default WithoutNav;
