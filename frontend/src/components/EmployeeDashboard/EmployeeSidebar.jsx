// EMS/frontend/src/components/EmployeeDashboard/EmployeeSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const EmployeeSidebar = () => {
    const { user } = useAuth();

    return (
        <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 w-64 space-y-2">
            <div className="bg-teal-600 h-12 flex items-center justify-center">
                <h3 className="font-serif text-2xl text-center">Employee MS</h3>
            </div>
            <div className="px-4">
                <NavLink 
                    to="/employee-dashboard" 
                    className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-200 hover:bg-teal-600`}
                    end
                >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink 
                    to={`/employee-dashboard/profile/${user?._id}`} 
                    className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-200 hover:bg-teal-600`}
                >
                    <FaUser />
                    <span>My Profile</span>
                </NavLink>

                <NavLink 
                    to={`/employee-dashboard/leaves/${user?._id}`} 
                    className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-200 hover:bg-teal-600`}
                >
                    <FaCalendarAlt />
                    <span>My Leaves</span>
                </NavLink>

                <NavLink 
                    to={`/employee-dashboard/salary/${user?._id}`} 
                    className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-200 hover:bg-teal-600`}
                >
                    <FaMoneyBillWave />
                    <span>My Salary</span>
                </NavLink>

                <NavLink 
                    to="/employee-dashboard/setting" 
                    className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-200 hover:bg-teal-600`}
                >
                    <FaCogs />
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    );
};

export default EmployeeSidebar;