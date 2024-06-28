import React from 'react';
import Leftbar from '../../components/topbar/Leftbar';
import Feed from '../../components/topbar/Feed';
import Barright from '../../components/Barright';

const Home = () => {
  return (
    <div className="flex">
      {/* Leftbar (1/4 of the screen) */}
      <div className="w-1/4  mt-8">
        <Leftbar />
      </div>

      {/* Main Content Area (1/2 of the screen) */}
      <div className="w-1/2 m-auto mt-8 ">
        <Feed />
        {/* Add more components as needed */}

        {/* Placeholder for content to demonstrate scrollability */}
      </div>

      {/* Rightbar (1/4 of the screen) */}
      <div className="w-1/4 p-4 mt-8">
        <Barright />
      </div>

      {/* Share component wrapped with a div with background color */}
      
    </div>
  );
};

export default Home;
