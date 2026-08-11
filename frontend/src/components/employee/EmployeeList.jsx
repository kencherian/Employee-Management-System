// EMS/frontend/src/components/employee/EmployeeList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/employee`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    let sno = 1;
                    const serverHost = API_BASE_URL.replace('/api', '');
                    const data = response.data.employees.map((emp) => ({
                        _id: emp._id,
                        sno: sno++,
                        dep_name: emp.department ? emp.department.dep_name : "N/A",
                        name: emp.userId ? emp.userId.name : "N/A",
                        dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "N/A",
                        profileImage: (
                            <img 
                                width={40} 
                                className="rounded-full h-10 w-10 object-cover" 
                                src={`${serverHost}/${emp.userId?.profileImage}`} 
                                alt={emp.userId?.name}
                            />
                        ),
                        action: (<EmployeeButtons _id={emp._id} />)
                    }));
                    setEmployees(data);
                    setFilteredEmployees(data);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setEmpLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleFilter = (e) => {
        const records = employees.filter((emp) => 
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredEmployees(records);
    };

    return (
        <div className="p-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Employees</h3>
            </div>
            <div className="flex justify-between items-center my-5">
                <input 
                    type="text" 
                    placeholder="Search By Name" 
                    onChange={handleFilter}
                    className="px-4 py-0.5 border text-black rounded"
                />
                <Link 
                    to="/admin-dashboard/add-employee" 
                    className="px-4 py-1 bg-teal-600 text-white rounded"
                >
                    Add New Employee
                </Link>
            </div>
            <div className="mt-5">
                <DataTable 
                    columns={columns} 
                    data={filteredEmployees} 
                    pagination 
                    progressPending={empLoading}
                />
            </div>
        </div>
    );
};

export default EmployeeList;