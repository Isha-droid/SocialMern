import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams} from 'react-router-dom';
import { FaHeart, FaRegComment, FaShare, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { AuthContext } from '../../context/AuthContext';

const UserProfile = () => {
  const { user: currentUser } = useContext(AuthContext); 
  const { username } = useParams(); // Get the username from the URL parameters
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(0);
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // state for update modal
  const [points, setPoints] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/post/profile', {
          username: username 
        });
        const { user, posts } = response.data;
        setUser(user);
        setPosts(posts);
        setLikes(posts.reduce((acc, post) => acc + post.likes.length, 0));
        setFollowers(user.followers.length);
        setFollowing(user.following.includes(currentUser._id));
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [username, currentUser._id]);

  useEffect(() => {
    const calculateRewards = () => {
      const newPoints = Math.floor(likes / 10);
      setPoints(newPoints);
      const newDiscount = Math.floor(newPoints / 5) * 5;
      setDiscount(newDiscount);
    };

    calculateRewards();
  }, [likes]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const toggleLikesModal = () => {
    setShowLikesModal(!showLikesModal);
  };

  const toggleUpdateModal = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  const handleGoLive = () => {
    alert('You are now live!');
  };

  const handleFollow = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/follow/${currentUser.username}`, {
        followUsername: user.username,
      });
      alert(response.data.message)

      if (response.data.message === "User followed successfully") {
        setFollowing(true);
        setFollowers(prev => prev + 1); // Increment followers count
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("There was an error following the user", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/unfollow/${currentUser.username}`, {
        unfollowUsername: user.username,
      });
      alert(response.data.message)
      if (response.data.message === "User unfollowed successfully") {
        setFollowing(false);
        setFollowers(prev => prev - 1); // Decrement followers count
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("There was an error unfollowing the user", error);
    }
  };

  

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-pink-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex items-center">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="User" className="h-24 w-24 rounded-full object-cover border-4 border-pink-500" />
            ) : (
              <FaUserCircle className="h-24 w-24 text-gray-500" />
            )}
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
              <p className="text-gray-600 text-lg">Fashion Influencer</p>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center space-x-2">
                  <FaUserCircle className="text-4xl text-pink-600 cursor-pointer" />
                  <span className="text-gray-600">{followers} Followers</span>
                </div>
                {currentUser._id !== user._id && (
                  <div className="flex space-x-4">
                    <button
                      onClick={handleFollow}
                      className={`px-4 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 ${following && 'hidden'}`}
                    >
                      Follow
                    </button>
                    <button
                      onClick={handleUnfollow}
                      className={`px-4 py-2 rounded-md bg-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 ${!following && 'hidden'}`}
                    >
                      Unfollow
                    </button>
                  </div>
                )}
                {currentUser._id === user._id && (
                       <Link to={`/updateProfile/${username}`} className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300">
                       Update Profile
                     </Link>
               
                )}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">My Fashion Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <div key={post._id} className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  {post.img ? (
                    <img src={post.img} alt="Fashion" className="w-full h-64 object-cover" />
                  ) : (
                    <FaUserCircle className="w-full h-64 text-gray-500" />
                  )}
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center">
                    <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">{post.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">My Interests</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FaHeart className="text-red-500 cursor-pointer" onClick={handleLike} />
                <span className="text-gray-600">{likes} Likes</span>
              </div>
              <FaRegComment className="text-gray-600 cursor-pointer" />
              <FaShare className="text-gray-600 cursor-pointer" />
              <button onClick={toggleLikesModal} className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300">
                View Likes
              </button>
            </div>
          </div>
          <div className="mt-8">
            <button onClick={handleGoLive} className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300">
              Go Live
            </button>
          </div>
        </div>
      </div>

      {showLikesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">People Who Liked Your Posts</h2>
            <ul className="divide-y divide-gray-200">
              {posts.map(post => (
                <li key={post._id} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <img src={post.user.profilePicture} alt="User" className="h-10 w-10 rounded-full object-cover" />
                    <span className="font-semibold">{post.user.username}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                </li>
              ))}
            </ul>
            <button onClick={toggleLikesModal} className="mt-4 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300">
              Close
            </button>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Update Profile</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to update your profile?</p>
            <div className="flex space-x-4">
              <button onClick={redirectToUpdateProfile} className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300">
                Yes
              </button>
              <button onClick={toggleUpdateModal} className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
