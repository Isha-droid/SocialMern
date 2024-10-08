import React, { useState } from 'react';
import { FaHeart, FaShare, FaImage } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Post = ({ post, user }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.put(`http://localhost:5000/api/post/${post._id}/like`, {}, config);
      
      if (response.data.message === "Post liked") {
        setLikes(likes + 1);
        alert("Post liked");
      } else if (response.data.message === "Post unliked") {
        if(likes>0){

        
        setLikes(likes-1);
        }
        toast.success("Post unliked");
      }

      setLiked(!liked);
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      toast.error("Error liking/unliking post");
    }
  };

  const formattedDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 m-auto max-w-lg">
      <div className="postTop flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.username}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="h-10 w-10 text-gray-500" />
          )}
          <div>
            <span className="font-semibold">{user?.username || 'Unknown User'}</span>
            <span className="text-gray-500 text-sm block">{formattedDate}</span>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <BsThreeDots />
        </button>
      </div>
      <div className="postCenter my-3">
        {post.desc && <p className="text-gray-700 mb-2">{post.desc}</p>}
        {post.img ? (
          <img src={post.img} alt="Post" className="w-full rounded-lg" />
        ) : (
          <FaImage className="h-40 w-full text-gray-300" />
        )}
      </div>
      <div className="postBottom flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaHeart
            className={`text-gray-500 cursor-pointer ${liked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          />
          <FaShare className="text-blue-500 cursor-pointer" />
          <span className="text-gray-500 text-sm">{likes} {likes === 1 ? 'like' : 'likes'}</span>
        </div>
        <span className="text-gray-500 text-sm">
          {post.comments?.length || 0} {post.comments?.length === 1 ? 'comment' : 'comments'}
        </span>
      </div>
    </div>
  );
};

export default Post;
