import React, { useEffect, useState } from "react";
import axios from "axios";
import "./app.css";

const App = () => {
  const [assignments, setAssignments] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'employee_id', direction: 'ascending' });

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Change in 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/api/project_assignments");
    setAssignments(response.data);
  };

  const sortedAssignments = [...assignments].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <h1>Project Assignments</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('employee_id')}>Employee ID</th>
            <th onClick={() => requestSort('employee_name')}>Employee Name</th>
            <th onClick={() => requestSort('project_name')}>Project Name</th>
            <th onClick={() => requestSort('start_date')}>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedAssignments.map((assignment) => (
            <tr key={assignment._id}>
              <td>{assignment.employee_id}</td>
              <td>{assignment.employee_name}</td>
              <td>{assignment.project_name}</td>
              <td>{new Date(assignment.start_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
