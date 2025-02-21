import React from 'react';
import NavBar from './NavBar.tsx';
import { Outlet } from 'react-router-dom';

const WithNav: React.FC = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default WithNav;
