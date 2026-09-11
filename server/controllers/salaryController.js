// EMS/server/controllers/salaryController.js
import Salary from '../models/Salary.js';
import mongoose from 'mongoose';

const addSalary = async (req, res) => {
    // 1. Initialize the session and start the transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        });

        // 2. Pass the session into the save operation
        await newSalary.save({ session });

        // (Future scalability: Any additional DB updates, like writing to a company financial ledger 
        // or updating a payroll audit log, would go here and also receive the { session } parameter).

        // 3. Commit the transaction if all operations succeed
        await session.commitTransaction();
        return res.status(200).json({ success: true, message: "Salary processed successfully." });

    } catch (error) {
        // 4. Rollback all changes if ANY operation in the block fails
        await session.abortTransaction();
        return res.status(500).json({ 
            success: false, 
            error: "Payroll operation failed. Transaction safely rolled back." 
        });
    } finally {
        // 5. Always end the session to prevent memory leaks
        session.endSession();
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