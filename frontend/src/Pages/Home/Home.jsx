import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel = () => {
  const [requests, setRequests] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchRequests();
    fetchEmployees();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost/Web/backend/fetch-requests.php');
      if (response.data.status === 'success') {
        setRequests(response.data.requests);
      } else {
        toast.error(response.data.message || 'Failed to fetch requests.');
      }
    } catch (error) {
      toast.error('Failed to fetch requests.');
      console.error('Fetch requests error:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost/Web/backend/fetch-employees.php');
      if (response.data.status === 'success') {
        setEmployees(response.data.employees);
      } else {
        toast.error(response.data.message || 'Failed to fetch employees.');
      }
    } catch (error) {
      toast.error('Failed to fetch employees.');
      console.error('Fetch employees error:', error);
    }
  };

  const handleApproveRequest = async (requestId) => {
    try {
      const response = await axios.post('http://localhost/Web/backend/approve-request.php', { id: requestId });
      if (response.data.status === 'success') {
        toast.success(response.data.message);
        fetchRequests(); // Refresh the list after approval
      } else {
        toast.error(response.data.message || 'Failed to approve request.');
      }
    } catch (error) {
      toast.error('Failed to approve request.');
      console.error('Approve request error:', error);
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      const response = await axios.post('http://localhost/Web/backend/decline-request.php', { id: requestId });
      if (response.data.status === 'success') {
        toast.success(response.data.message);
        fetchRequests(); // Refresh the list after decline
      } else {
        toast.error(response.data.message || 'Failed to decline request.');
      }
    } catch (error) {
      toast.error('Failed to decline request.');
      console.error('Decline request error:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';

    return date.toLocaleDateString(); // Customize format as needed
  };

  return (
    <div className="admin-panel">
      <h1>Pending Registration Requests</h1>
      <table>
        <thead>
          <tr>
            <th>EmployeeID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.name}</td>
              <td>{request.email}</td>
              <td>
                <button className="abutton" onClick={() => handleApproveRequest(request.id)}>Approve</button>
                <button className="dbutton" onClick={() => handleDeclineRequest(request.id)}>Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>All Employees</h1>
      <table>
        <thead>
          <tr>
            <th>EmployeeID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Registration Date</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{formatDate(employee.time)}</td> 
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default AdminPanel;
