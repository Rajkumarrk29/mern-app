import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // Adjust the path as necessary
import CreateEmployee from './components/CreateEmployee'; // Adjust the path as necessary
import EmployeeList from './components/EmployeeList'; // Adjust the path as necessary
import EditEmployee from './components/EditEmployee'; // Adjust the path as necessary
import './App.css'; // Optional: import your CSS file

const App = () => {
    return (
        <Router>
            <div className="App">
                <header>
                    <h1>Employee Management System</h1>
                </header>
                <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/create-employee" component={CreateEmployee} />
                    <Route path="/employee-list" component={EmployeeList} />
                    <Route path="/edit-employee/:id" component={EditEmployee} />
                    <Route path="*">
                        <h2>404 Not Found</h2>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
