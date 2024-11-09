import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const Signup = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:3000/api/v1/user/register', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
                setInput({
                    username: "",
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
                        Signup
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block font-medium text-gray-700">Username</label>
                        <Input
                            type="text"
                            name="username"
                            value={input.username}
                            onChange={changeEventHandler}
                            className="focus-visible:ring-transparent my-2 w-full border-gray-300 rounded-md"
                            placeholder="Enter your username"
                        />
                    </div>
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
                                Signing up...
                            </Button>
                        ) : (
                            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md">
                                Signup
                            </Button>
                        )}
                    </div>
                    <p className="text-center mt-4 text-gray-500 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Signup;