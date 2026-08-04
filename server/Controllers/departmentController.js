// EMS/server/controllers/departmentController.js
import Department from '../models/Department.js';

// Get All Departments
const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({ success: true, departments });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get department server error" });
    }
};

// Add New Department
const addDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body;
        const newDep = new Department({
            dep_name,
            description
        });
        await newDep.save();
        return res.status(200).json({ success: true, department: newDep });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Add department server error" });
    }
};

// Get Single Department for Editing
const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById({ _id: id });
        return res.status(200).json({ success: true, department });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get single department error" });
    }
};

// Update Department
const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { dep_name, description } = req.body;
        const updateDep = await Department.findByIdAndUpdate(
            { _id: id },
            { dep_name, description, updatedAt: Date.now() },
            { new: true }
        );
        return res.status(200).json({ success: true, department: updateDep });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Edit department server error" });
    }
};

// Delete Department
const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDep = await Department.findByIdAndDelete({ _id: id });
        return res.status(200).json({ success: true, department: deletedDep });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Delete department server error" });
    }
};

export { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment };