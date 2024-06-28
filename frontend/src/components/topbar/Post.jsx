import React from 'react';
import { FaHeart, FaRegComment, FaShare } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import profileImage from '../../assets/person/1.jpeg'; // Replace with your actual path
import postImage from '../../assets/post/1.jpeg'; // Replace with your actual path

const Post = () => {
  return (
    <div className="post bg-white shadow-md rounded-lg p-6 mb-6 transition-transform transform hover:scale-105">
      <div className="wrapper">
        <div className="postTop flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={profileImage}
              className="h-12 w-12 rounded-full object-cover border-2 border-indigo-500"
              alt="Profile"
            />
            <div>
              <span className="font-semibold text-gray-900">John Doe</span>
              <br />
              <span className="text-sm text-gray-500">5 mins ago</span>
            </div>
          </div>
          <BsThreeDots className="text-gray-600 cursor-pointer" />
        </div>
        <div className="postCenter mb-4">
          <p className="text-gray-800 mb-4">Having a great time at the beach! The weather is amazing and the waves are perfect. #beachday #funinthesun</p>
          <img
            src={postImage}
            className="w-full rounded-md object-cover"
            alt="Post"
          />
        </div>
        <div className="postBottom flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors">
              <FaHeart className="cursor-pointer hover:scale-125 transition-transform" />
              <span className="text-sm">Like</span>
            </button>
            <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors">
              <FaRegComment className="cursor-pointer hover:scale-125 transition-transform" />
              <span className="text-sm">Comment</span>
            </button>
            <button className="flex items-center space-x-1 text-green-500 hover:text-green-600 transition-colors">
              <FaShare className="cursor-pointer hover:scale-125 transition-transform" />
              <span className="text-sm">Share</span>
            </button>
            <span className="text-gray-600 font-medium">32 likes</span>
          </div>
          <div>
            <span className="text-gray-600 hover:underline cursor-pointer">View all 8 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
