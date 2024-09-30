const express = require('express');
const mongoose = require('mongoose');
const Employee = require('./models/Employee'); // Adjust the path as necessary
const router = express.Router();

// Connect to MongoDB (adjust the URI as needed)
mongoose.connect('mongodb://localhost:27017/your_database_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees' });
    }
});

// Get a single employee by ID
router.get('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee' });
    }
});

// Create a new employee
router.post('/employees', async (req, res) => {
    const { name, email, mobile, designation, gender, course, image } = req.body;

    const newEmployee = new Employee({
        name,
        email,
        mobile,
        designation,
        gender,
        course,
        image,
        createdAt: new Date(),
    });

    try {
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(400).json({ message: 'Error creating employee' });
    }
});

// Update an employee
router.put('/employees/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
        res.json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: 'Error updating employee' });
    }
});

// Delete an employee
router.delete('/employees/:id', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee' });
    }
});

// Export the router
module.exports = router;
