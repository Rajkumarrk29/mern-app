import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h1>Welcome to the Admin Panel</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/create-employee">Create Employee</Link>
                    </li>
                    <li>
                        <Link to="/employee-list">Employee List</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Dashboard;
