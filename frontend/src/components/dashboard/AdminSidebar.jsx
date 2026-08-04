// EMS/frontend/src/components/dashboard/AdminSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    FaBuilding, 
    FaCalendarAlt, 
    FaCogs, 
    FaMoneyBillWave, 
    FaTachometerAlt, 
    FaUsers 
} from 'react-icons/fa';
import { FaBuilding as BuildingIcon, FaUsers as UsersIcon, FaTachometerAlt as DashIcon, FaCalendarAlt as LeaveIcon, FaMoneyBillWave as SalaryIcon, FaCogs as SettingsIcon } from 'react-icons/fa';

const AdminSidebar = () => {
    return (
        <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 w-64 space-y-2">
            <div className="bg-teal-600 h-12 flex items-center justify-center">
                <h3 className="font-serif text-2xl text-center">Employee MS</h3>
            </div>
            <div className="px-4">
                <NavLink 
                    to="/admin-dashboard" 
                    className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-200 hover:bg-teal-600`}
                    end
                >
                    <DashIcon />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink 
                    to="/admin-dashboard/employees" 
                    className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-200 hover:bg-teal-600`}
                >
                    <UsersIcon />
                    <span>Employees</span>
                </NavLink>

                <NavLink 
                    to="/admin-dashboard/departments" 
                    className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-200 hover:bg-teal-600`}
                >
                    <BuildingIcon />
                    <span>Departments</span>
                </NavLink>

                <NavLink 
                    to="/admin-dashboard/leaves" 
                    className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-200 hover:bg-teal-600`}
                >
                    <LeaveIcon />
                    <span>Leaves</span>
                </NavLink>

                <NavLink 
                    to="/admin-dashboard/salary/add" 
                    className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-200 hover:bg-teal-600`}
                >
                    <SalaryIcon />
                    <span>Salary</span>
                </NavLink>

                <NavLink 
                    to="/admin-dashboard/setting" 
                    className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-200 hover:bg-teal-600`}
                >
                    <SettingsIcon />
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    );
};

export default AdminSidebar;