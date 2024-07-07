import React from 'react'
import Leftbar from '../../components/topbar/Leftbar'
import DiscussionForum from '../../components/DisscussionForum'

const Forum = () => {
  return (
    <div className="flex">
      {/* Leftbar (1/4 of the screen) */}
      <div className="w-1/4 mt-8">
        <Leftbar />
      </div>

      {/* Main Content Area (1/2 of the screen) */}
      <div className="w-1/2 mt-8 mx-auto"> {/* mx-auto for equal margins */}
        <DiscussionForum/>
        {/* Add more components as needed */}

        {/* Placeholder for content to demonstrate scrollability */}
      </div>

      

      {/* Share component wrapped with a div with background color */}
      
    </div>
  )
}

export default Forum
