// EMS/frontend/src/utils/EmployeeHelper.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px",
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "90px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "130px",
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "130px",
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "130px",
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true,
    },
];

export const fetchDepartments = async () => {
    let departments = [];
    try {
        const response = await axios.get('http://localhost:5000/api/department', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.data.success) {
            departments = response.data.departments;
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
        }
    }
    return departments;
};

export const EmployeeButtons = ({ _id }) => {
    const navigate = useNavigate();

    return (
        <div className="flex space-x-2">
            <button 
                onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
                className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
                View
            </button>
            <button 
                onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Edit
            </button>
            <button 
                onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
                className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
                Salary
            </button>
            <button 
                onClick={() => navigate(`/admin-dashboard/employees/leaves/${_id}`)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Leave
            </button>
        </div>
    );
};