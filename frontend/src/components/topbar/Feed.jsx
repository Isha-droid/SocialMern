import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Share from './Share';
import Post from './Post';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(""); // State to manage errors

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');

        // Set headers with Authorization token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get('http://localhost:5000/api/post/', config);

        // Log the response to see what is being returned
        console.log("API Response:", response.data);

        // Check if response.data.posts is an array
        if (response.data && Array.isArray(response.data.posts)) {
          const postsWithUser = await Promise.all(
            response.data.posts.map(async (post) => {
              const userResponse = await axios.get(`http://localhost:5000/api/user/${post.userId}`);
              return { ...post, user: userResponse.data };
            })
          );
          setPosts(postsWithUser);
        } else {
          setError("Unexpected API response format");
        }

        setLoading(false); // Set loading to false after successful fetch
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Error fetching posts. Please try again."); // Set error message
        setLoading(false); // Set loading to false on error
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="h-full flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div className="h-full flex justify-center items-center text-red-500">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="h-full flex justify-center items-center">No posts available.</div>;
  }

  return (
    <div className="justify-center items-center h-full">
      <Share text={text} setText={setText} />
      {posts.map((post) => (
        <Post key={post._id} post={post} user={post.user} />
      ))}
    </div>
  );
};

export default Feed;
