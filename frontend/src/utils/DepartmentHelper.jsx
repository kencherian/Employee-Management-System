// EMS/frontend/src/utils/DepartmentHelper.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "100px",
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true,
    },
    {
        name: "Action",
        selector: (row) => row.action,
    },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Do you want to delete this department?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    onDepartmentDelete(id);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        }
    };

    return (
        <div className="flex space-x-3">
            <button 
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
                className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
                Edit
            </button>
            <button 
                onClick={() => handleDelete(_id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Delete
            </button>
        </div>
    );
};