// EMS/server/controllers/salaryController.js
import Salary from '../models/Salary.js';
import Employee from '../models/Employee.js';

// Add Salary Record
const addSalary = async (req, res) => {
    try {
        const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

        const totalSalary = parseInt(basicSalary) + parseInt(allowances || 0) - parseInt(deductions || 0);

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        });

        await newSalary.save();
        return res.status(200).json({ success: true, message: "Salary added successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Add salary server error: " + error.message });
    }
};

// Get Salary History for an Employee
const getSalary = async (req, res) => {
    try {
        const { id } = req.params;
        let salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId');
        
        if (salary.length === 0) {
            const employee = await Employee.findOne({ userId: id });
            if (employee) {
                salary = await Salary.find({ employeeId: employee._id }).populate('employeeId', 'employeeId');
            }
        }

        return res.status(200).json({ success: true, salary });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get salary server error: " + error.message });
    }
};

export { addSalary, getSalary };