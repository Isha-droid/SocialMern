import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import cloudinaryUpload from './cloudinaryUpload';

const ProfileUpdate = () => {
  const { user, updateUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: '',
    profilePicture: user.profilePicture,
    desc: user.desc,
    city: user.city,
    relationship: user.relationship,
    image: null, // For storing selected file (image)
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username } = user;
      const { email, password, desc, city, relationship, image } = formData;

      // If image is selected, upload it to Cloudinary
      let profilePictureUrl = formData.profilePicture;
      if (image) {
        profilePictureUrl = await cloudinaryUpload(image);
      }

      const updatedData = {
        email,
        password,
        desc,
        city,
        relationship,
        profilePicture: profilePictureUrl,
      };
      console.log(updatedData)

      // Get token from local storage
      const token = localStorage.getItem('token');

      // Set Authorization header with Bearer token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://localhost:5000/api/user/update/${username}`,
        updatedData,
        config // Pass config object with headers
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            New Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            minLength="6"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desc">
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Tell us about yourself..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            maxLength="50"
            placeholder="Your city..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="relationship">
            Relationship Status
          </label>
          <select
            id="relationship"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="1">Single</option>
            <option value="2">In a Relationship</option>
            <option value="3">Married</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Profile Picture
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit" onClick={handleSubmit}
          className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
