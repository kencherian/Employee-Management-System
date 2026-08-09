// EMS/server/controllers/leaveController.js
import Leave from '../models/Leave.js';
import Employee from '../models/Employee.js';

// Add Leave Request
const addLeave = async (req, res) => {
    try {
        const { userId, leaveType, startDate, endDate, reason } = req.body;
        const employee = await Employee.findOne({ userId });

        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        const newLeave = new Leave({
            employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            reason
        });

        await newLeave.save();
        return res.status(200).json({ success: true, message: "Leave applied successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Add leave server error: " + error.message });
    }
};

// Get Leave History for a Specific Employee
const getLeave = async (req, res) => {
    try {
        const { id } = req.params;
        let employee = await Employee.findOne({ userId: id });
        if (!employee) {
            employee = await Employee.findById({ _id: id });
        }

        const leaves = await Leave.find({ employeeId: employee._id });
        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get leave server error: " + error.message });
    }
};

// Get All Leaves for Admin View
const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [
                { path: "department", select: "dep_name" },
                { path: "userId", select: "name" }
            ]
        });

        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get leaves server error: " + error.message });
    }
};

// Get Single Leave Detail for Admin Review
const getLeaveDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await Leave.findById({ _id: id }).populate({
            path: "employeeId",
            populate: [
                { path: "department", select: "dep_name" },
                { path: "userId", select: "name profileImage" }
            ]
        });

        return res.status(200).json({ success: true, leave });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get leave detail server error: " + error.message });
    }
};

// Update Leave Status (Approved / Rejected)
const updateLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const leave = await Leave.findByIdAndUpdate({ _id: id }, { status }, { new: true });
        if (!leave) {
            return res.status(404).json({ success: false, error: "Leave not found" });
        }

        return res.status(200).json({ success: true, message: "Leave updated successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Update leave server error: " + error.message });
    }
};

export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave };