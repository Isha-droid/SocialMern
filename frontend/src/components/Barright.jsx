import React from 'react';
import adImage from '../assets/ad.png';
import personImage from '../assets/person/3.jpeg';

const Barright = () => {
  return (
    <div className="w-1/4 bg-white shadow-md rounded-lg p-6 fixed right-0 top-16 overflow-y-auto h-full">
      <div className="wrapper space-y-6">
        {/* Fashion News Section */}
        <div className="fashionNews">
          <h2 className="text-indigo-700 font-bold mb-4">Fashion News</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
              <img src="https://source.unsplash.com/random/50x50/?fashion,summer" alt="Fashion News 1" className="h-12 w-12 rounded-md object-cover" />
              <div>
                <p className="text-gray-900 font-medium">New Summer Collection Launched</p>
                <p className="text-gray-500 text-sm">Stay updated with the latest summer trends from top designers.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
              <img src="https://source.unsplash.com/random/50x50/?fashion,show" alt="Fashion News 2" className="h-12 w-12 rounded-md object-cover" />
              <div>
                <p className="text-gray-900 font-medium">Top Fashion Shows to Watch</p>
                <p className="text-gray-500 text-sm">Don't miss out on the biggest fashion shows of the season.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
              <img src="https://source.unsplash.com/random/50x50/?celebrity,fashion" alt="Fashion News 3" className="h-12 w-12 rounded-md object-cover" />
              <div>
                <p className="text-gray-900 font-medium">Celebrity Fashion Trends</p>
                <p className="text-gray-500 text-sm">Check out what your favorite celebrities are wearing this season.</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Advertisement */}
        <div className="adContainer bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
          <img src={adImage} alt="Ad" className="w-full rounded-md" />
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Online Influencers */}
        <div className="onlineInfluencers">
          <h3 className="text-indigo-700 font-bold mb-4">Online Influencers</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
              <img src={personImage} alt="Influencer" className="h-10 w-10 rounded-full object-cover" />
              <p className="text-gray-900 font-medium">Alexandra Johnson</p>
            </div>
            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
              <img src="https://source.unsplash.com/random/50x50/?person" alt="Influencer 2" className="h-10 w-10 rounded-full object-cover" />
              <p className="text-gray-900 font-medium">Michael Brown</p>
            </div>
            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
              <img src="https://source.unsplash.com/random/50x50/?model" alt="Influencer 3" className="h-10 w-10 rounded-full object-cover" />
              <p className="text-gray-900 font-medium">Sarah Williams</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Barright;
