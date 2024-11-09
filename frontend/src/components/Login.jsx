import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:3000/api/v1/user/login', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
                setInput({
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={signupHandler} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-blue-600 animate-bounce">SafeNet</h1>
                    <p className="text-gray-500 text-lg mt-2">
                        Login
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block font-medium text-gray-700">Email</label>
                        <Input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="focus-visible:ring-transparent my-2 w-full border-gray-300 rounded-md"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Password</label>
                        <Input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            className="focus-visible:ring-transparent my-2 w-full border-gray-300 rounded-md"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        {loading ? (
                            <Button className="flex items-center justify-center bg-blue-500 text-white w-full py-2 rounded-md">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Logging in...
                            </Button>
                        ) : (
                            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md">
                                Login
                            </Button>
                        )}
                    </div>
                    <p className="text-center mt-4 text-gray-500 text-sm">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;