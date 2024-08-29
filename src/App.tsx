import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './features/auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Property from './features/property';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/property" element={<Property />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
