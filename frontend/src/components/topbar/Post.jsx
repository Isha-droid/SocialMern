import React, { useState } from 'react';
import { FaHeart, FaShare } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa'; // Import a default avatar icon from react-icons
import { formatDistanceToNow } from 'date-fns';

const Post = ({ post, user }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(false);
  console.log(user.username);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const formattedDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 m-auto">
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
        {post.photo && <img src={post.photo} alt="Post" className="w-full rounded-lg" />}
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
          {post.comments} {post.comments === 1 ? 'comment' : 'comments'}
        </span>
      </div>
    </div>
  );
};

export default Post;
