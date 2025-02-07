import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PasswordReset from './components/PasswordReset';
import Main from './components/Main';
import AboutUs from './components/AboutUs';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </div>
  );
};

export default App;
