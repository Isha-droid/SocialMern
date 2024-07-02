import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import './App.css';
import Topbar from './components/topbar/Topbar';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <AuthContextProvider>

    <Router>
      <div className="App">
        <Topbar/>/
        <Routes>
          Topbar
          <Route exact path="/"  element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
    </AuthContextProvider>
  );
}

export default App;
