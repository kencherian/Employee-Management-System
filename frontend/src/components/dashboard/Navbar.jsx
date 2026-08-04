// EMS/frontend/src/components/dashboard/Navbar.jsx
import React from 'react';
import { useAuth } from '../../context/authContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex items-center justify-between text-white bg-teal-600 h-12 px-5">
            <p className="font-semibold">Welcome {user?.name || "User"}</p>
            <button 
                onClick={logout} 
                className="px-4 py-1 bg-teal-800 hover:bg-teal-900 rounded text-sm font-medium transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar;