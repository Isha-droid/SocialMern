import React from 'react';
import Share from './Share';
import Post from './Post';
import { Posts, Users } from '../DummyData'; // Assuming your data is in a file called data.js

const Feed = () => {
  return (
    <div className="justify-center items-center h-full">
      <Share />
      {Posts.map((post) => {
        const user = Users.find((user) => user.id === post.userId);
        return <Post key={post.id} post={post} user={user} />;
      })}
    </div>
  );
};

export default Feed;
