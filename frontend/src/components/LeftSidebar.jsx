import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import CreatePost from './CreatePost';
import { setPosts, setSelectedPost } from '@/redux/postSlice';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';

const LeftSidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const { likeNotification } = useSelector(store => store.realTimeNotification);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                dispatch(setSelectedPost(null));
                dispatch(setPosts([]));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const sidebarHandler = (textType) => {
        if (textType === 'Logout') {
            logoutHandler();
        } else if (textType === "Create") {
            setOpen(true);
        } else if (textType === "Profile") {
            navigate(`/profile/${user?._id}`);
        } else if (textType === "Home") {
            navigate("/");
        } else if (textType === 'Messages') {
            navigate("/chat");
        }
    }

    const sidebarItems = [
        { icon: <Home />, text: "Home" },
        { icon: <Search />, text: "Search" },
        { icon: <TrendingUp />, text: "Explore" },
        { icon: <MessageCircle />, text: "Messages" },
        { icon: <Heart />, text: "Notifications" },
        { icon: <PlusSquare />, text: "Create" },
        {
            icon: (
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                    <AvatarFallback>{user?.username?user.username[0].toUpperCase(): 'U'}</AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
        { icon: <LogOut />, text: "Logout" },
    ];

    return (
        <div className='fixed top-0 left-0 z-10 h-screen px-6 pt-8 w-[20%] bg-gray-50 shadow-lg border-r border-gray-200'>
            <div className='flex flex-col'>
                <h1 className='font-bold text-xl mb-5 text-center'>SafeNet</h1>

                <div>
                    {sidebarItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => sidebarHandler(item.text)}
                            className='flex items-center gap-4 p-3 my-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-150'
                        >
                            <span className='text-blue-500'>{item.icon}</span>
                            <span className='font-medium text-lg text-gray-700'>{item.text}</span>

                            {item.text === "Notifications" && likeNotification.length > 0 && (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button size='icon' className="absolute h-5 w-5 bg-red-600 text-white rounded-full text-xs flex items-center justify-center -top-1 -right-3">
                                            {likeNotification.length}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div>
                                            {likeNotification.length === 0 ? (
                                                <p className='text-center text-gray-500'>No new notifications</p>
                                            ) : (
                                                likeNotification.map((notification) => (
                                                    <div key={notification.userId} className='flex items-center gap-2 my-2'>
                                                        <Avatar className='w-8 h-8'>
                                                            <AvatarImage src={notification.userDetails?.profilePicture} />
                                                            <AvatarFallback>{user?.username?user.username[0].toUpperCase(): ''}</AvatarFallback>
                                                        </Avatar>
                                                        <p className='text-sm'>
                                                            <span className='font-bold'>{notification.userDetails?.username}</span> liked your post
                                                        </p>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <CreatePost open={open} setOpen={setOpen} />
        </div>
    );
}

export default LeftSidebar;