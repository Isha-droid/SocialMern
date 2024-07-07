import React, { useContext, useEffect, useState } from 'react';
import { FaImage, FaVideo } from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import cloudinaryUpload from './cloudinaryUpload'; // Assuming cloudinaryUpload.js is in the same directory

const DiscussionForum = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/message', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('User not authenticated');
      return;
    }

    try {
      let uploadedMediaUrl = null;
      if (mediaUrl) {
        uploadedMediaUrl = await cloudinaryUpload(mediaUrl);
      }

      const response = await axios.post(
        'http://localhost:5000/api/message',
        {
          content: message,
          mediaUrl: uploadedMediaUrl, // Use uploaded media URL
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setMessage('');
      setMediaUrl('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setMediaUrl(file);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
        <div className="mb-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex items-start mb-4 ${
                msg.userId.username === user.username ? 'justify-end' : ''
              } transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              {msg.userId.username !== user.username && (
                <img
                  className="w-10 h-10 rounded-full mr-3"
                  src={msg.userId.profilePicture || 'https://via.placeholder.com/40'}
                  alt="User Avatar"
                />
              )}
              <div
                className={`p-3 rounded-lg ${
                  msg.userId.username === user.username ? 'bg-pink-200 text-right' : 'bg-gray-200'
                } shadow-md hover:shadow-lg`}
              >
                <p className="text-gray-800">{msg.content}</p>
                {msg.mediaUrl && (
                  <div className="mt-2">
                    {msg.mediaUrl.includes('.mp4') ? (
                      <video className="rounded-lg" controls>
                        <source src={msg.mediaUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img className="rounded-lg" src={msg.mediaUrl} alt="Media" />
                    )}
                  </div>
                )}
              </div>
              {msg.userId.username === user.username && (
                <img
                  className="w-10 h-10 rounded-full ml-3"
                  src={user.profilePicture || 'https://via.placeholder.com/40'}
                  alt="User Avatar"
                />
              )}
            </div>
          ))}
        </div>
        {/* Message input area */}
        <div className="flex items-center border-t pt-4">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-grow p-2 border rounded-lg mr-2 focus:outline-none focus:border-pink-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <label className="text-pink-500 mr-2 cursor-pointer">
            <FaImage size={20} />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          <label className="text-pink-500 cursor-pointer">
            <FaVideo size={20} />
            <input
              type="file"
              className="hidden"
              accept="video/*"
              onChange={handleImageUpload}
            />
          </label>
          <button
            className="bg-pink-500 text-white p-2 rounded-lg ml-auto focus:outline-none transform hover:scale-110 transition-transform"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscussionForum;
