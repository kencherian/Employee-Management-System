// EMS/frontend/src/components/EmployeeDashboard/EmployeeSummary.jsx
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const EmployeeSummary = () => {
    const { user } = useAuth();

    return (
        <div className="p-6">
            <div className="rounded flex bg-white border shadow-sm p-4 items-center space-x-4">
                <div className="text-3xl flex justify-center items-center bg-teal-600 text-white p-4 rounded-full">
                    <FaUser />
                </div>
                <div>
                    <p className="text-lg font-semibold">Welcome Back</p>
                    <p className="text-2xl font-bold">{user?.name}</p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeSummary;