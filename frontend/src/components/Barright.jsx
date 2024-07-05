import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import adImage from '../assets/ad.png';
import { FaUserCircle } from 'react-icons/fa'; // Import FaUserCircle from react-icons
import { AuthContext } from '../context/AuthContext';
import './Barright.css'; // Import the new CSS file

const Barright = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem('token');
        if (user && user._id) {
          const userId = user._id; // Replace with the actual user ID
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };

          const response = await axios.get(`http://localhost:5000/api/user/friends/${userId}`, config);
          console.log(response.data);
          setFriends(response.data);
        } else {
          console.error("User ID not found");
          setError("User ID not found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching friends:", error);
        setError("Error fetching friends. Please try again.");
        setLoading(false);
      }
    };

    fetchFriends();
  }, [user]);

  return (
    <div className="w-1/4 bg-pink-50 shadow-md rounded-lg p-6 fixed right-0 top-16 h-full barright-container">
      <div className="wrapper space-y-6">

      <div className="onlineInfluencers">
          <h3 className="text-pink-700 font-bold mb-4">Online Influencers</h3>
          <div className="space-y-3">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              friends.map((friend) => (
                <div key={friend._id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                  {friend.img ? (
                    <img src={friend.img} alt={friend.username} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <FaUserCircle className="h-10 w-10 text-gray-400" />
                  )}
                  <p className="text-gray-900 font-medium">{friend.username}</p>
                </div>
              ))
            )}
          </div>
        {/* Fashion News Section */}
        <div className="fashionNews">
          <h2 className="text-pink-700 font-bold mb-4">Fashion News</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
              <img src="https://source.unsplash.com/random/50x50/?fashion,summer" alt="Fashion News 1" className="h-12 w-12 rounded-md object-cover" />
              <div>
                <p className="text-gray-900 font-medium">New Summer Collection Launched</p>
                <p className="text-gray-500 text-sm">Stay updated with the latest summer trends from top designers.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
              <img src="https://source.unsplash.com/random/50x50/?fashion,show" alt="Fashion News 2" className="h-12 w-12 rounded-md object-cover" />
              <div>
                <p className="text-gray-900 font-medium">Top Fashion Shows to Watch</p>
                <p className="text-gray-500 text-sm">Don't miss out on the biggest fashion shows of the season.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
              <img src="https://source.unsplash.com/random/50x50/?celebrity,fashion" alt="Fashion News 3" className="h-12 w-12 rounded-md object-cover" />
              <div>
                <p className="text-gray-900 font-medium">Celebrity Fashion Trends</p>
                <p className="text-gray-500 text-sm">Check out what your favorite celebrities are wearing this season.</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Advertisement */}
        <div className="adContainer bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
          <img src={adImage} alt="Ad" className="w-full rounded-md" />
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Online Influencers */}
       
        </div>
      </div>
    </div>
  );
};

export default Barright;
