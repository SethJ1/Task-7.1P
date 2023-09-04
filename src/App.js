import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import LoginPage from './routes/LoginPage';
import StartPage from './routes/StartPage'; 
import Signup from './routes/CreateAccountPage';

function App() {
  return (
    <Router>
      <div>
        <Header /> 
        <Routes>
          <Route
            path="/" 
            element={<LoginPage />}
          />
          <Route path="/create-account" element={<Signup />} />
          <Route path="/home" element={<StartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
