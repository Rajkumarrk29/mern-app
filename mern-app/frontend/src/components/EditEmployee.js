import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditEmployee = () => {
    const { id } = useParams();
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: ''
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`/api/employees/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };

        fetchEmployee();
    }, [id]);

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
            await axios.put(`/api/employees/${id}`, formData);
            history.push('/employee-list'); // Redirect to employee list after updating
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Employee</h2>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
            <select name="designation" value={formData.designation} onChange={handleChange} required>
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
            </select>
            <div>
                <label>Gender:</label>
                <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male
                <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
            </div>
            <div>
                <label>Course:</label>
                <input type="checkbox" name="course" value="MCA" checked={formData.course.includes('MCA')} onChange={handleChange} /> MCA
                <input type="checkbox" name="course" value="BCA" checked={formData.course.includes('BCA')} onChange={handleChange} /> BCA
                <input type="checkbox" name="course" value="BSC" checked={formData.course.includes('BSC')} onChange={handleChange} /> BSC
            </div>
            <input type="file" name="image" onChange={handleChange} />
            <button type="submit">Update</button>
        </form>
    );
};

export default EditEmployee;
