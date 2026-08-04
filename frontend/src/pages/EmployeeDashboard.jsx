// EMS/frontend/src/pages/EmployeeDashboard.jsx
import React from 'react';
import EmployeeSidebar from '../components/EmployeeDashboard/EmployeeSidebar';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';

const EmployeeDashboard = () => {
    return (
        <div className="flex">
            <EmployeeSidebar />
            <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default EmployeeDashboard;