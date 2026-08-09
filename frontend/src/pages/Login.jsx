// EMS/frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
            
            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                if (response.data.user.role === "admin") {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/employee-dashboard');
                }
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Server Error. Please try again.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
            <h2 className="font-serif text-3xl text-white">Employee Management System</h2>
            <div className="border shadow p-6 w-80 bg-white rounded">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input 
                            type="email" 
                            className="w-full px-3 py-2 border rounded text-black" 
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-3 py-2 border rounded text-black" 
                            placeholder="*****"
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="mb-4 flex items-center justify-between">
                        <label className="inline-flex items-center text-xs text-gray-600">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2">Remember me</span>
                        </label>
                        <a href="#" className="text-xs text-teal-600">Forgot password?</a>
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;