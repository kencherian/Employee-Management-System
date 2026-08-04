// EMS/frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import EmployeeList from './components/employee/EmployeeList';
import AddEmployee from './components/employee/AddEmployee';
import ViewEmployee from './components/employee/ViewEmployee';
import AddSalary from './components/salary/AddSalary';
import ViewSalary from './components/salary/ViewSalary';
import LeaveList from './components/leave/LeaveList';
import LeaveDetail from './components/leave/LeaveDetail';
import AddLeave from './components/leave/AddLeave';
import EmployeeLeaveList from './components/leave/EmployeeLeaveList';
import Setting from './components/dashboard/Setting';
import EmployeeSummary from './components/EmployeeDashboard/EmployeeSummary';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        
        {/* Admin Dashboard Routes */}
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<AdminSummary />}></Route>
          <Route path="/admin-dashboard/departments" element={<DepartmentList />}></Route>
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />}></Route>
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />}></Route>
          
          {/* Employee Routes */}
          <Route path="/admin-dashboard/employees" element={<EmployeeList />}></Route>
          <Route path="/admin-dashboard/add-employee" element={<AddEmployee />}></Route>
          <Route path="/admin-dashboard/employees/:id" element={<ViewEmployee />}></Route>
          <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList />}></Route>
          
          {/* Salary Routes */}
          <Route path="/admin-dashboard/salary/add" element={<AddSalary />}></Route>
          <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary />}></Route>

          {/* Leave Routes */}
          <Route path="/admin-dashboard/leaves" element={<LeaveList />}></Route>
          <Route path="/admin-dashboard/leaves/:id" element={<LeaveDetail />}></Route>
          <Route path="/admin-dashboard/setting" element={<Setting />}></Route>
        </Route>

        {/* Employee Dashboard Routes */}
        <Route path="/employee-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<EmployeeSummary />}></Route>
          <Route path="/employee-dashboard/profile/:id" element={<ViewEmployee />}></Route>
          <Route path="/employee-dashboard/add-leave" element={<AddLeave />}></Route>
          <Route path="/employee-dashboard/leaves/:id" element={<EmployeeLeaveList />}></Route>
          <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />}></Route>
          <Route path="/employee-dashboard/setting" element={<Setting />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;