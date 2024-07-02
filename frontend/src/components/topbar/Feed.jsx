import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Share from './Share';
import Post from './Post';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("Feed rendered");

    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/post/');
        console.log(response.data);
        const postsWithUser = await Promise.all(
          response.data.map(async (post) => {
            const userResponse = await axios.get(`http://localhost:5000/api/user/${post.userId}`);
            return { ...post, user: userResponse.data };
          })
        );
        setPosts(postsWithUser);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

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
