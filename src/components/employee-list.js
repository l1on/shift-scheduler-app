import React, { Component }  from 'react';
import { Route, Link } from 'react-router-dom'

import Schedule from './schedule';

export default class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            employees: []
        };
    }

    componentDidMount() {
        fetch("/api/employees")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        employees: result
                });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                });
            }
        )
    }

    render() {
        const { error, isLoaded, employees } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <h1>Employee Shifts</h1>
                    <p>Click on one's name to see the employee's June 2015 shift schedule.</p>
                    <ul>
                        {employees.map(employee => (
                            <li key={employee.id}>
                                <Link to={{pathname: `/employee/${employee.id}/shifts`, state: {name: employee.name}}}>
                                    {employee.name}
                                </Link>  
                            </li>
                        ))}
                    </ul>

                    <Route path={`/employee/:employeeId/shifts`} component={Schedule}/>
                </div>

            );
        }
    }
    
}