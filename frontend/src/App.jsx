import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import './App.css';
import Topbar from './components/topbar/Topbar';
import { AuthContext, AuthContextProvider } from './context/AuthContext';
import UpdateForm from './pages/update-form/UpdateForm';
UpdateForm

function App() {
  const { user } = useContext(AuthContext);

  return (
    <AuthContextProvider>
      <Router>
        <div className="App">
          <Topbar />
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Home /> : <Navigate to="/register" />}
            />
            <Route
              path="/login"
              element={  <Login />}
            />
            <Route
              path="/register"
              element={ <Register />}
            />
            <Route
              path="/profile/:username"
              element={<Profile /> }
            />
            <Route
              path="/updateProfile/:username"
              element={<UpdateForm/> }
            />
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
