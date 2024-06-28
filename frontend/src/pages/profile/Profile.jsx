import React from 'react'
import Leftbar from '../../components/topbar/Leftbar';
import UserProfile from '../../components/topbar/UserProfile';
const Profile = () => {
  return (
    <div className="flex">
      {/* Leftbar (1/4 of the screen) */}
      <div className="w-1/4 mt-8">
        <Leftbar />
      </div>

      {/* Main Content Area (1/2 of the screen) */}
      <div className="w-3/4 mt-8 mx-auto"> {/* mx-auto for equal margins */}
        {/* Add more components as needed */}

      <UserProfile/>
        {/* Placeholder for content to demonstrate scrollability */}
      </div>

      

      {/* Share component wrapped with a div with background color */}
      
    </div>
  );
};


export default Profile
