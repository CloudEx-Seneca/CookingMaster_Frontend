import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.tsx';
import RecipeList from './components/RecipeList.tsx'
import RecipeForm from './components/RecipeForm.tsx'
import SignUp from './components/SignUp.tsx';
import PasswordReset from './components/PasswordReset.tsx';
import Main from './components/Main.tsx';
import AboutUs from './components/AboutUs.tsx';
import './styles/styles.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/add" element={<RecipeForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
