// EMS/frontend/src/components/dashboard/Setting.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/api';

const Setting = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [setting, setSetting] = useState({
        userId: user?._id,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (setting.newPassword !== setting.confirmPassword) {
            setError("New password and confirm password do not match");
            return;
        }

        try {
            const response = await axios.put(`${API_BASE_URL}/setting/change-password`, setting, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                setError(null);
                alert("Password changed successfully");
                if (user.role === "admin") {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/employee-dashboard');
                }
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="text-sm font-medium text-gray-700">Old Password</label>
                    <input 
                        type="password" 
                        name="oldPassword" 
                        onChange={handleChange} 
                        placeholder="Old Password" 
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black" 
                        required 
                    />
                </div>
                <div className="mt-3">
                    <label className="text-sm font-medium text-gray-700">New Password</label>
                    <input 
                        type="password" 
                        name="newPassword" 
                        onChange={handleChange} 
                        placeholder="New Password" 
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black" 
                        required 
                    />
                </div>
                <div className="mt-3">
                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        onChange={handleChange} 
                        placeholder="Confirm Password" 
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black" 
                        required 
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default Setting;