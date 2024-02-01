import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ComputerConfigPage from './pages/ComputerConfigPage';
import AdminPanelPage from './pages/AdminPanelPage';
import BannedPage from './pages/BannedPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/computer-config" element={<ComputerConfigPage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path="/banned" element={<BannedPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
