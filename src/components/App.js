import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'

import EmployeeList from './employee-list';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
            <EmployeeList />
        </Router>
      </div>
    );
  }
}

export default App;