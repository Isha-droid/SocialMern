import React from 'react';
import Share from './Share';
import Post from './Post';

const Feed = () => {
  return (
    <div className="justify-center items-center h-full">
      <Share />
      <Post/>
    </div>
  );
};

export default Feed;
