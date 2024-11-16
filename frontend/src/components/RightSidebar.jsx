import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth);
  return (
    <div className='w-72 my-5 mx-5 p-6 sticky bg-white shadow-xl rounded-lg'>
      <div className='flex items-center gap-4 mb-6'>
        <Link to={`/profile/${user?._id}`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="post_image" />
            <AvatarFallback>{user?.username?user.username[0].toUpperCase(): ''}</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className='font-semibold text-lg'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
          <span className='text-gray-500 text-sm'>{user?.bio || 'Bio goes here...'}</span>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-2">
        <SuggestedUsers />
      </div>
    </div>
  )
}

export default RightSidebar