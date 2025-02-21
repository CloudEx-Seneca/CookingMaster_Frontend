import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { withNavRoutes, withoutNavRoutes } from './routes/routes.tsx'
import store from './store/store.tsx';
import './styles/styles.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            { withoutNavRoutes }
            { withNavRoutes }
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
