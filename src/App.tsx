import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/Login.tsx';
import RecipeList from './components/RecipeList.tsx'
import RecipeForm from './components/RecipeForm.tsx'
import SignUp from './components/SignUp.tsx';
import PasswordReset from './components/PasswordReset.tsx';
import Main from './components/Main.tsx';
import AboutUs from './components/AboutUs.tsx';
import ShoppingCart from './components/ShoppingCart.tsx';
import './styles/styles.css';
import LogoutLoad from './components/LogoutLoad.tsx';
import Profile from './components/Profile.tsx';
import NavBar from './components/NavBar.tsx';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/home" element={<Main />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipes/add" element={<RecipeForm />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/shoppinglist" element={<ShoppingCart />} />
            <Route path="/logout" element={<LogoutLoad />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
