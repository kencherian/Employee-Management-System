// EMS/frontend/src/components/leave/EmployeeLeaveList.jsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeLeaveList = () => {
    const [leaves, setLeaves] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/leave/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    setLeaves(response.data.leaves);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };
        fetchLeaves();
    }, [id]);

    return (
        <div className="p-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">My Leaves</h3>
            </div>
            <div className="flex justify-between items-center my-5">
                <input 
                    type="text" 
                    placeholder="Search By Reason" 
                    className="px-4 py-0.5 border text-black rounded"
                />
                <Link 
                    to="/employee-dashboard/add-leave" 
                    className="px-4 py-1 bg-teal-600 text-white rounded"
                >
                    Add New Leave
                </Link>
            </div>

            <table className="w-full text-sm text-left text-gray-500 mt-6 border">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr>
                        <th className="px-6 py-3">S No</th>
                        <th className="px-6 py-3">Leave Type</th>
                        <th className="px-6 py-3">From</th>
                        <th className="px-6 py-3">To</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.map((leave, index) => (
                        <tr key={leave._id} className="bg-white border-b">
                            <td className="px-6 py-3">{index + 1}</td>
                            <td className="px-6 py-3">{leave.leaveType}</td>
                            <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td className="px-6 py-3">{leave.reason}</td>
                            <td className="px-6 py-3 font-semibold">
                                <span className={`px-2 py-1 rounded text-white text-xs font-bold ${
                                    leave.status === "Approved" ? "bg-green-500" :
                                    leave.status === "Rejected" ? "bg-red-500" : "bg-yellow-500"
                                }`}>
                                    {leave.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeLeaveList;