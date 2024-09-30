const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

// Create an Employee
router.post('/create', async (req, res) => {
    const { name, email, mobile, designation, gender, course, image } = req.body;

    try {
        const employee = new Employee({ name, email, mobile, designation, gender, course, image });
        await employee.save();
        res.status(201).json({ message: 'Employee created successfully', employee });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get All Employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Edit Employee
router.put('/edit/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEmployee);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete Employee
router.delete('/delete/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
