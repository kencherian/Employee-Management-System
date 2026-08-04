// EMS/frontend/src/components/salary/ViewSalary.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewSalary = () => {
    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setFilteredSalaries] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    setSalaries(response.data.salary);
                    setFilteredSalaries(response.data.salary);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };
        fetchSalaries();
    }, [id]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        const records = salaries.filter((sal) =>
            sal.employeeId?.employeeId.toLowerCase().includes(query)
        );
        setFilteredSalaries(records);
    };

    return (
        <>
            {filteredSalaries === null ? (
                <div>Loading...</div>
            ) : (
                <div className="p-5">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Salary History</h2>
                    </div>
                    <div className="flex justify-end my-3">
                        <input 
                            type="text" 
                            placeholder="Search By Emp ID" 
                            className="border px-2 rounded-md text-black" 
                            onChange={handleSearch}
                        />
                    </div>
                    {filteredSalaries.length > 0 ? (
                        <table className="w-full text-sm text-left text-gray-500 mt-6 border">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3">S No</th>
                                    <th className="px-6 py-3">Emp ID</th>
                                    <th className="px-6 py-3">Salary</th>
                                    <th className="px-6 py-3">Allowance</th>
                                    <th className="px-6 py-3">Deduction</th>
                                    <th className="px-6 py-3">Total</th>
                                    <th className="px-6 py-3">Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSalaries.map((sal, index) => (
                                    <tr key={sal._id} className="bg-white border-b">
                                        <td className="px-6 py-3">{index + 1}</td>
                                        <td className="px-6 py-3">{sal.employeeId?.employeeId}</td>
                                        <td className="px-6 py-3">{sal.basicSalary}</td>
                                        <td className="px-6 py-3">{sal.allowances}</td>
                                        <td className="px-6 py-3">{sal.deductions}</td>
                                        <td className="px-6 py-3">{sal.netSalary}</td>
                                        <td className="px-6 py-3">{new Date(sal.payDate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : <div className="text-center mt-5">No Records Found</div>}
                </div>
            )}
        </>
    );
};

export default ViewSalary;