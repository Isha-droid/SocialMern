import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // If using React Router, adjust as needed
import fashionBackground from '../../assets/fashionbg.jpeg'; // Example fashion background image (replace with actual image)

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use formData object for further processing (e.g., API call, validation)
    console.log('Form data:', formData);
    // Clear form after submission (optional)
    setFormData({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-pink-600 mb-2">Join Us</h2>
          <p className="text-sm text-pink-600 italic">"Fashion is about something that comes by being with us."</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-pink-700">Full Name</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-pink-500" aria-hidden="true" />
              </div>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-base border-pink-300 rounded-md h-12" 
                placeholder="Enter your full name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-pink-700">Email Address</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-pink-500" aria-hidden="true" />
              </div>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-base border-pink-300 rounded-md h-12" 
                placeholder="Enter your email address" 
                value={formData.email} 
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
          <button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-pink-600 text-sm">
          Already have an account? <Link to="/login" className="font-medium text-pink-500 hover:text-pink-700">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
