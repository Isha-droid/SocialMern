import axios from 'axios';
import React, { useContext, useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const [err, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    const email = username

    try {
      await loginCall({ email, password }, dispatch);

      setSuccess('Login successful!');
      setError('');
      navigate("/");
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <p className="text-sm text-pink-600 italic">"Fashion is about dressing according to what's fashionable. Style is more about being yourself." - Oscar de la Renta</p>
        </div>
        <h2 className="text-3xl font-bold text-center text-pink-800 mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-pink-700">Username</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-pink-500" aria-hidden="true" />
              </div>
              <input 
                type="text" 
                id="username" 
                name="username" 
                className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-base border-pink-300 rounded-md h-12" 
                placeholder="Enter your username" 
                value={formData.username} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-pink-700">Password</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-pink-500" aria-hidden="true" />
              </div>
              <input 
                type="password" 
                id="password" 
                name="password" 
                className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-base border-pink-300 rounded-md h-12" 
                placeholder="Enter your password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          <button 
            type="submit" 
            className={`bg-pink-600 hover:bg-pink-700 text-white w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 ${isFetching ? 'cursor-not-allowed' : ''}`}
            disabled={isFetching}
          >
            {isFetching ? 'Loading...' : 'Log In'}
          </button>
        </form>
        {err && <p className="mt-2 text-center text-red-600">{err}</p>}
        {success && <p className="mt-2 text-center text-green-600">{success}</p>}
        <p className="mt-4 text-center text-pink-600 text-sm">
          Don't have an account? <Link to="/signup" className="font-medium text-pink-500 hover:text-pink-700">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
