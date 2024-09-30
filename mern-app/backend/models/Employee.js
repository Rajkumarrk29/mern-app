const mongoose = require('mongoose');

// Define the Employee schema
const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
    },
    designation: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
    },
    course: {
        type: [String],
        required: true,
    },
    image: {
        type: String, // URL or file path of the uploaded image
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the Employee model
module.exports = mongoose.model('Employee', EmployeeSchema);
