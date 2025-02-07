import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.tsx';
import SignUp from './components/SignUp.tsx';
import PasswordReset from './components/PasswordReset.tsx';
import Main from './components/Main.tsx';
import AboutUs from './components/AboutUs.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
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
