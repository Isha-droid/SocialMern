import React from 'react';
import { FaHome, FaComments, FaVideo, FaUsers, FaBookmark, FaQuestion, FaBriefcase, FaCalendarAlt, FaBook, FaChevronDown } from 'react-icons/fa';
import './Leftbar.css'; // Import CSS file for scrollbar styles

const Leftbar = () => {
  // Dummy data for friends
  const friends = [
    { id: 1, name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, name: 'Alice Johnson', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: 4, name: 'Bob Brown', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { id: 5, name: 'Eve Wilson', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
    { id: 6, name: 'Charlie Davis', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
  ];

  return (
    <div className="bg-pink-50 shadow-md h-screen overflow-y-auto fixed top-16 left-0 w-1/5">
      <ul className="flex flex-col items-start p-4 space-y-2">
        {/* Navigation items */}
        <li className="flex items-center space-x-3 hover:bg-pink-100 p-2 rounded-md transition-colors duration-300 w-full">
          <FaHome className="text-pink-600" />
          <span className="text-gray-900 font-medium ml-2">Fashion Feed</span>
        </li>
        <li className="flex items-center space-x-3 hover:bg-pink-100 p-2 rounded-md transition-colors duration-300 w-full">
          <FaComments className="text-pink-600" />
          <span className="text-gray-900 font-medium ml-2">Fashion Chats</span>
        </li>
        <li className="flex items-center space-x-3 hover:bg-pink-100 p-2 rounded-md transition-colors duration-300 w-full">
          <FaVideo className="text-pink-600" />
          <span className="text-gray-900 font-medium ml-2">Fashion Videos</span>
        </li>
        <li className="flex items-center space-x-3 hover:bg-pink-100 p-2 rounded-md transition-colors duration-300 w-full">
          <FaUsers className="text-pink-600" />
          <span className="text-gray-900 font-medium ml-2">Fashion Groups</span>
        </li>
        <li className="flex items-center space-x-3 hover:bg-pink-100 p-2 rounded-md transition-colors duration-300 w-full">
          <FaBookmark className="text-pink-600" />
          <span className="text-gray-900 font-medium ml-2">Fashion Bookmarks</span>
        </li>
        <li className="flex items-center space-x-3 hover:bg-pink-100 p-2 rounded-md transition-colors duration-300 w-full">
          <FaQuestion className="text-pink-600" />
          <span className="text-gray-900 font-medium ml-2">Fashion Questions</span>
        </li>
        <li className="flex items-center space-x-3 hover:bg-pink-100 p-2 rounded-md transition-colors duration-300 w-full">
          <FaBriefcase className="text-pink-600" />
          <span className="text-gray-900 font-medium ml-2">Fashion Jobs</span>
        </li>
        <li className="flex items-center space-x-3 hover:bg-pink-100 p-2 rounded-md transition-colors duration-300 w-full">
          <FaCalendarAlt className="text-pink-600" />
          <span className="text-gray-900 font-medium ml-2">Fashion Events</span>
        </li>
        <li className="flex items-center space-x-3 hover:bg-pink-100 p-2 rounded-md transition-colors duration-300 w-full">
          <FaBook className="text-pink-600" />
          <span className="text-gray-900 font-medium ml-2">Fashion Courses</span>
        </li>

        {/* Show more button */}
        <li className="flex items-center space-x-3 hover:bg-pink-100 p-2 rounded-md transition-colors duration-300 w-full">
          <button className="flex items-center text-pink-600">
            <FaChevronDown />
            <span className="text-gray-900 font-medium ml-2">Show More</span>
          </button>
        </li>

        {/* Friends list */}
        <li className="flex flex-col space-y-2 mt-4">
          <span className="text-gray-600 font-medium ml-4 mb-2">Friends</span>
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center space-x-3 hover:bg-pink-100 p-2 rounded-md transition-colors duration-300 w-full">
              <img src={friend.avatar} alt={friend.name} className="h-8 w-8 rounded-full" />
              <span className="text-gray-900 font-medium ml-2">{friend.name}</span>
            </div>
          ))}
        </li>
      </ul>
    </div>
  );
};

export default Leftbar;
