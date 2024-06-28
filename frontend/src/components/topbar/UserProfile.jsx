import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegComment, FaShare, FaUserCircle } from 'react-icons/fa';
import userImage from '../../assets/person/3.jpeg'; // Example profile image (replace with actual image)
import fashionImage1 from '../../assets/post/1.jpeg'; // Example fashion images (replace with actual images)
import fashionImage2 from '../../assets/post/2.jpeg'; // Example fashion images (replace with actual images)
import fashionImage3 from '../../assets/post/3.jpeg'; // Example fashion images (replace with actual images)
import { Users, Posts } from '../DummyData'; // Importing sample data (replace with actual data)

const UserProfile = () => {
  const [likes, setLikes] = useState(10); // Example initial likes count
  const [following, setFollowing] = useState(true); // Example following status
  const [followers, setFollowers] = useState(20); // Example initial followers count
  const [showLikesModal, setShowLikesModal] = useState(false); // State to toggle likes modal visibility
  const [points, setPoints] = useState(0); // Initial points count
  const [discount, setDiscount] = useState(0); // Initial discount percentage

  useEffect(() => {
    // Calculate points and discount based on likes
    const calculateRewards = () => {
      const newPoints = Math.floor(likes / 10); // Example: 1 point for every 10 likes
      setPoints(newPoints);
      // Example: Provide 5% discount for every 5 points
      const newDiscount = Math.floor(newPoints / 5) * 5;
      setDiscount(newDiscount);
    };

    calculateRewards();
  }, [likes]);

  // Function to simulate increasing likes
  const handleLike = () => {
    setLikes(likes + 1);
    // Logic to update points based on likes (e.g., 1 point for every 10 likes)
    // Implement your custom logic here
  };

  // Function to toggle likes modal visibility
  const toggleLikesModal = () => {
    setShowLikesModal(!showLikesModal);
  };

  // Function to handle going live
  const handleGoLive = () => {
    // Implement logic for going live
    alert('You are now live!');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex items-center">
            <img src={userImage} alt="User" className="h-24 w-24 rounded-full object-cover border-4 border-indigo-500" />
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-gray-900">Alex Durden</h1>
              <p className="text-gray-600 text-lg">Fashion Influencer</p>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center space-x-2">
                  <FaUserCircle className="text-4xl text-indigo-500 cursor-pointer" onClick={() => console.log('View Profile')} />
                  <span className="text-gray-600">{followers} Followers</span>
                </div>
                <button onClick={() => setFollowing(!following)} className={`px-4 py-2 rounded-md ${following ? 'bg-gray-300 text-gray-600' : 'bg-indigo-500 text-white hover:bg-indigo-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300`}>
                  {following ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">My Fashion Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img src={fashionImage1} alt="Fashion 1" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center">
                  <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Summer Vibes</p>
                </div>
              </div>
              <div className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img src={fashionImage2} alt="Fashion 2" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center">
                  <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Autumn Essentials</p>
                </div>
              </div>
              <div className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img src={fashionImage3} alt="Fashion 3" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center">
                  <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Winter Style</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">My Interests</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FaHeart className="text-red-500 cursor-pointer" onClick={handleLike} />
                <span className="text-gray-600">{likes} Likes</span> {/* Display current likes */}
              </div>
              <FaRegComment className="text-gray-600 cursor-pointer" />
              <FaShare className="text-gray-600 cursor-pointer" />
              <button onClick={toggleLikesModal} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300">
                View Likes
              </button>
            </div>
          </div>
          {/* Button to go live */}
          <div className="mt-8">
            <button onClick={handleGoLive} className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300">
              Go Live
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Likes */}
      {showLikesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">People Who Liked Your Posts</h2>
            <ul className="divide-y divide-gray-200">
              {Posts.map((post) => (
                <li key={post.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <img src={Users.find(user => user.id === post.userId)?.profilePicture} alt="User" className="h-10 w-10 rounded-full object-cover" />
                    <span className="font-semibold">{Users.find(user => user.id === post.userId)?.username}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{post.date}</span>
                </li>
              ))}
            </ul>
            <button onClick={toggleLikesModal} className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
