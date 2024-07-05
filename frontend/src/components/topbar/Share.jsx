import React, { useState } from 'react';
import { FaCamera, FaMapMarkerAlt, FaSmile } from 'react-icons/fa';
import axios from 'axios';
import logo from '../../assets/person/2.jpeg'; // Adjust the path based on your project structure

const Share = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      let imageUrl = '';
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'myntra_social'); // Replace with your Cloudinary upload preset

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dp6r7jk5u/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await response.json();
        imageUrl = data.secure_url;
        console.log(imageUrl)
      }

      const postData = {
        desc: text,
        img: imageUrl // Assuming your API expects 'image' for the uploaded image URL
      };

      const response = await axios.post('http://localhost:5000/api/post', postData, config);
      console.log('Post successful:', response.data);
      
      // Optionally, you can reset the input fields after successful submission
      setText('');
      setFile(null);
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            className="h-8 w-8 rounded-full object-cover"
            alt="User"
          />
          <input
            type="text"
            placeholder="What's on your mind?"
            className="w-full outline-none text-gray-800 placeholder-gray-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <hr className="my-2 border-gray-300" />
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <label className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 focus:outline-none">
              <FaCamera />
              <span className="text-sm">Upload Photo</span>
              <input
                type="file"
                accept=".png, .jpeg, .jpg"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 focus:outline-none">
              <FaMapMarkerAlt />
              <span className="text-sm">Location</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 focus:outline-none">
              <FaSmile />
              <span className="text-sm">Feeling/Activity</span>
            </button>
          </div>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none">
            Share
          </button>
        </div>
      </form>
    </div>
  );
};

export default Share;
