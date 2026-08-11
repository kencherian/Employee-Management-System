// EMS/frontend/src/components/leave/LeaveList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/api';

const LeaveList = () => {
    const [leaves, setLeaves] = useState(null);
    const [filteredLeaves, setFilteredLeaves] = useState(null);
    const navigate = useNavigate();

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/leave`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                setLeaves(response.data.leaves);
                setFilteredLeaves(response.data.leaves);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const filterByStatus = (status) => {
        if (status === "All") {
            setFilteredLeaves(leaves);
        } else {
            const records = leaves.filter((leave) => leave.status === status);
            setFilteredLeaves(records);
        }
    };

    return (
        <>
            {filteredLeaves === null ? (
                <div>Loading...</div>
            ) : (
                <div className="p-6">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold">Manage Leaves</h3>
                    </div>
                    <div className="flex justify-between items-center my-5">
                        <div className="flex space-x-3">
                            <button onClick={() => filterByStatus("All")} className="px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700">All</button>
                            <button onClick={() => filterByStatus("Pending")} className="px-4 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700">Pending</button>
                            <button onClick={() => filterByStatus("Approved")} className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700">Approved</button>
                            <button onClick={() => filterByStatus("Rejected")} className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700">Rejected</button>
                        </div>
                    </div>

                    <table className="w-full text-sm text-left text-gray-500 mt-6 border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3">S No</th>
                                <th className="px-6 py-3">Emp ID</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Leave Type</th>
                                <th className="px-6 py-3">Department</th>
                                <th className="px-6 py-3">Days</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeaves.map((leave, index) => {
                                const days = Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)) + 1;
                                return (
                                    <tr key={leave._id} className="bg-white border-b">
                                        <td className="px-6 py-3">{index + 1}</td>
                                        <td className="px-6 py-3">{leave.employeeId?.employeeId}</td>
                                        <td className="px-6 py-3">{leave.employeeId?.userId?.name}</td>
                                        <td className="px-6 py-3">{leave.leaveType}</td>
                                        <td className="px-6 py-3">{leave.employeeId?.department?.dep_name}</td>
                                        <td className="px-6 py-3">{days}</td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-1 rounded text-white text-xs font-bold ${
                                                leave.status === "Approved" ? "bg-green-500" :
                                                leave.status === "Rejected" ? "bg-red-500" : "bg-yellow-500"
                                            }`}>
                                                {leave.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <button 
                                                onClick={() => navigate(`/admin-dashboard/leaves/${leave._id}`)}
                                                className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default LeaveList;