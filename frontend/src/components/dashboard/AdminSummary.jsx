import { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';

const AdminSummary = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/dashboard/summary`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    setSummary(response.data);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    console.error(error.response.data.error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

    if (loading) {
        return <div className="p-6 text-xl font-semibold">Loading Dashboard Data...</div>;
    }

    return (
        <div className="p-6">
            <h3 className="text-2xl font-bold">Dashboard Overview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <SummaryCard 
                    icon={<FaUsers />} 
                    text="Total Employees" 
                    number={summary?.totalEmployees || 0} 
                    color="bg-teal-600" 
                />
                <SummaryCard 
                    icon={<FaBuilding />} 
                    text="Total Departments" 
                    number={summary?.totalDepartments || 0} 
                    color="bg-yellow-600" 
                />
                <SummaryCard 
                    icon={<FaMoneyBillWave />} 
                    text="Monthly Pay" 
                    number={`$${(summary?.totalSalary || 0).toLocaleString()}`} 
                    color="bg-red-600" 
                />
            </div>

            <div className="mt-12">
                <h4 className="text-center text-2xl font-bold">Leave Details</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <SummaryCard 
                        icon={<FaFileAlt />} 
                        text="Leave Applied" 
                        number={summary?.leaveSummary?.appliedFor || 0} 
                        color="bg-teal-600" 
                    />
                    <SummaryCard 
                        icon={<FaCheckCircle />} 
                        text="Leave Approved" 
                        number={summary?.leaveSummary?.approved || 0} 
                        color="bg-green-600" 
                    />
                    <SummaryCard 
                        icon={<FaHourglassHalf />} 
                        text="Leave Pending" 
                        number={summary?.leaveSummary?.pending || 0} 
                        color="bg-yellow-600" 
                    />
                    <SummaryCard 
                        icon={<FaTimesCircle />} 
                        text="Leave Rejected" 
                        number={summary?.leaveSummary?.rejected || 0} 
                        color="bg-red-600" 
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminSummary;