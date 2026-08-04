// EMS/server/controllers/employeeController.js
import Employee from '../models/Employee.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import path from 'path';

// Add Employee (Creates User + Employee linked record)
const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already registered in emp" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : ""
        });
        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        });

        await newEmployee.save();
        return res.status(200).json({ success: true, message: "Employee Created Successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Add employee server error: " + error.message });
    }
};

// Get All Employees
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate('userId', { password: 0 })
            .populate('department');
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get employees server error" });
    }
};

// Get Single Employee View Details
const getEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        let employee = await Employee.findById({ _id: id })
            .populate('userId', { password: 0 })
            .populate('department');

        if (!employee) {
            employee = await Employee.findOne({ userId: id })
                .populate('userId', { password: 0 })
                .populate('department');
        }

        return res.status(200).json({ success: true, employee });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get single employee server error" });
    }
};

// Edit Employee
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            maritalStatus,
            designation,
            department,
            salary
        } = req.body;

        const employee = await Employee.findById({ _id: id });
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        const user = await User.findById({ _id: employee.userId });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        await User.findByIdAndUpdate({ _id: employee.userId }, { name });
        await Employee.findByIdAndUpdate({ _id: id }, {
            maritalStatus,
            designation,
            department,
            salary
        });

        return res.status(200).json({ success: true, message: "Employee Updated" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Update employee server error" });
    }
};

// Get Employees By Department ID
const fetchEmployeesByDepId = async (req, res) => {
    const { id } = req.params;
    try {
        const employees = await Employee.find({ department: id })
            .populate('userId', { password: 0 });
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get employees by dep id server error" });
    }
};

export { addEmployee, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId };