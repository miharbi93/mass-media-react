import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const GenerateBill = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplicationId, setSelectedApplicationId] = useState('');
  const [controlNumber, setControlNumber] = useState('');
  const [message, setMessage] = useState('');

  const userID = parseInt(localStorage.getItem('userId'));

  const fetchApplications = () => {
    axios.get(`http://localhost:9000/api/applications/customers/${userID}/applications`)
      .then(response => {
        setApplications(response.data);
      })
      .catch(error => {
        console.error('Error fetching applications:', error);
        setMessage('Error fetching applications');
      });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApplicationIdChange = (event) => {
    setSelectedApplicationId(event.target.value);
  };

  const handleGenerateControlNumber = () => {
    if (selectedApplicationId) {
      axios.get(`http://localhost:9000/api/control-number/${selectedApplicationId}`)
        .then(response => {
          setControlNumber(response.data);
        })
        .catch(error => {
          console.error('Error generating control number:', error);
          setMessage('Error generating control number');
        });
    } else {
      setMessage('Please select an application ID');
    }
  };

  return (
    <div className="row">

    <h3 className="">Generate Bill</h3>
    <div className='col-md-4'>
    <div className="form-group">
      <label htmlFor="applicationId">Select an application ID</label>
      <select
        value={selectedApplicationId}
        onChange={handleApplicationIdChange}
        className="form-control"
      >
        <option value="">Select an application ID</option>
        {applications.map((application) => (
          <option key={application.applicationId} value={application.applicationId}>
            {application.applicationId}
          </option>
        ))}
      </select>
    </div>
    </div>

    <button
      onClick={handleGenerateControlNumber}
      className="btn btn-primary"
    >
      Generate Control Number
    </button>
    <p className="lead">Control Number: {controlNumber}</p>
    <p className="text-muted">{message}</p>
  </div>
  );
};