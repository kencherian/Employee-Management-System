import { useEffect, useState } from "react";
import {
  FaUser,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";
import { Link } from "react-router-dom";

const EmployeeSummary = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      if (!user?._id) return;
      try {
        const response = await axios.get(`${API_BASE_URL}/leave/${user._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setLeaves(response.data.leaves);
        }
      } catch (error) {
        console.error("Error fetching employee leaves:", error);
      }
    };

    fetchLeaves();
  }, [user]);

  const approvedCount = leaves.filter((l) => l.status === "Approved").length;
  const pendingCount = leaves.filter((l) => l.status === "Pending").length;
  const rejectedCount = leaves.filter((l) => l.status === "Rejected").length;

  return (
    <div className="p-6">
      {/* Welcome Banner */}
      <div className="rounded flex bg-white border shadow-sm p-4 items-center space-x-4">
        <div className="text-3xl flex justify-center items-center bg-teal-600 text-white p-4 rounded-full">
          <FaUser />
        </div>
        <div>
          <p className="text-lg font-semibold">Welcome Back</p>
          <p className="text-2xl font-bold">{user?.name}</p>
        </div>
      </div>

      {/* Leave Overview Cards */}
      <h4 className="text-xl font-bold mt-8 mb-4">My Leave Overview</h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded shadow-sm p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Total Applications</p>
            <p className="text-2xl font-bold">{leaves.length}</p>
          </div>
          <FaCalendarAlt className="text-3xl text-teal-600" />
        </div>
        <div className="bg-white border rounded shadow-sm p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Approved</p>
            <p className="text-2xl font-bold">{approvedCount}</p>
          </div>
          <FaCheckCircle className="text-3xl text-green-600" />
        </div>
        <div className="bg-white border rounded shadow-sm p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-2xl font-bold">{pendingCount}</p>
          </div>
          <FaHourglassHalf className="text-3xl text-yellow-600" />
        </div>
        <div className="bg-white border rounded shadow-sm p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Rejected</p>
            <p className="text-2xl font-bold">{rejectedCount}</p>
          </div>
          <FaTimesCircle className="text-3xl text-red-600" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex space-x-4">
        <Link
          to="/employee-dashboard/add-leave"
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded"
        >
          Apply for Leave
        </Link>
        <Link
          to={`/employee-dashboard/profile/${user?._id}`}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded"
        >
          View My Profile
        </Link>
      </div>
    </div>
  );
};

export default EmployeeSummary;
