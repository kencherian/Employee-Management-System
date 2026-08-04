// EMS/frontend/src/components/leave/LeaveDetail.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const LeaveDetail = () => {
    const { id } = useParams();
    const [leave, setLeave] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/leave/detail/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    setLeave(response.data.leave);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };
        fetchLeave();
    }, [id]);

    const changeStatus = async (status) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/leave/${id}`, { status }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                navigate("/admin-dashboard/leaves");
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <>
            {leave ? (
                <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <img 
                                src={`http://localhost:5000/${leave.employeeId?.userId?.profileImage}`} 
                                className="rounded-full w-72 h-72 object-cover border"
                                alt="Profile"
                            />
                        </div>
                        <div>
                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Name:</p>
                                <p className="text-lg font-medium">{leave.employeeId?.userId?.name}</p>
                            </div>
                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Employee ID:</p>
                                <p className="text-lg font-medium">{leave.employeeId?.employeeId}</p>
                            </div>
                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Leave Type:</p>
                                <p className="text-lg font-medium">{leave.leaveType}</p>
                            </div>
                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Reason:</p>
                                <p className="text-lg font-medium">{leave.reason}</p>
                            </div>
                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Department:</p>
                                <p className="text-lg font-medium">{leave.employeeId?.department?.dep_name}</p>
                            </div>
                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Start Date:</p>
                                <p className="text-lg font-medium">{new Date(leave.startDate).toLocaleDateString()}</p>
                            </div>
                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">End Date:</p>
                                <p className="text-lg font-medium">{new Date(leave.endDate).toLocaleDateString()}</p>
                            </div>
                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Action / Status:</p>
                                {leave.status === "Pending" ? (
                                    <div className="flex space-x-2">
                                        <button onClick={() => changeStatus("Approved")} className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                                            Approve
                                        </button>
                                        <button onClick={() => changeStatus("Rejected")} className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                                            Reject
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-lg font-medium">{leave.status}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : <div>Loading...</div>}
        </>
    );
};

export default LeaveDetail;