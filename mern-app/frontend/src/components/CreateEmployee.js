import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateEmployee = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: ''
    });

    const history = useHistory();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (checked) {
                setFormData((prev) => ({
                    ...prev,
                    course: [...prev.course, value],
                }));
            } else {
                setFormData((prev) => ({
                    ...prev,
                    course: prev.course.filter((c) => c !== value),
                }));
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/employees', formData);
            history.push('/employee-list'); // Redirect to employee list after creation
        } catch (error) {
            console.error('Error creating employee:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Employee</h2>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="mobile" placeholder="Mobile No" onChange={handleChange} required />
            <select name="designation" onChange={handleChange} required>
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
            </select>
            <div>
                <label>Gender:</label>
                <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
                <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
            </div>
            <div>
                <label>Course:</label>
                <input type="checkbox" name="course" value="MCA" onChange={handleChange} /> MCA
                <input type="checkbox" name="course" value="BCA" onChange={handleChange} /> BCA
                <input type="checkbox" name="course" value="BSC" onChange={handleChange} /> BSC
            </div>
            <input type="file" name="image" onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateEmployee;
