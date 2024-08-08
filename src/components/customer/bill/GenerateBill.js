import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const GenerateBill = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplicationId, setSelectedApplicationId] = useState('');
  const [controlNumber, setControlNumber] = useState('');
  const [message, setMessage] = useState('');
  const [payments, setPayments] = useState([]);

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

  const fetchPayments = () => {
    axios.get('http://localhost:9000/api/all')
      .then(response => {
        setPayments(response.data);
      })
      .catch(error => {
        console.error('Error fetching payments:', error);
        setMessage('Error fetching payments');
      });
  };

  useEffect(() => {
    fetchApplications();
    fetchPayments();
  }, []);

  const handleApplicationIdChange = (event) => {
    setSelectedApplicationId(event.target.value);
  };

  const handleGenerateControlNumber = () => {
    if (selectedApplicationId) {
      axios.get(`http://localhost:9000/api/control-number/${selectedApplicationId}`)
        .then(response => {
          setControlNumber(response.data);
          fetchPayments(); // Fetch payments again to update the table
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
      <h3 className="mb-4">Generate Bill</h3>
      <div className='col-md-3'>
        <div className="form-group">
          <label className='form-label'>Select Application ID</label>
          <select
            value={selectedApplicationId}
            onChange={handleApplicationIdChange}
            className="form-control mt-3 mb-5"
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

      <div className='col-md-4 mt-5'>
        <button
          onClick={handleGenerateControlNumber}
          className="btn btn-outline-primary"
        >
          Generate Control Number
        </button>
      </div>

      <p className="lead">Control Number: {controlNumber}</p>
      <p className="text-muted">{message}</p>

      {payments.length > 0 ? (
        <div className='row'>
          <div className='table table-responsive mt-2'>
            <table className='table table-hover table-bordered'>
              <thead>
                <tr>
                  <th className='text-center p-2'>SN</th>
                  <th className='text-center'>Payment ID</th>
                  <th className='text-center'>Control Number</th>
                  <th className='text-center'>Paid Amount</th>
                  <th className='text-center'>Payment Date</th>
                  <th className='text-center'>Payment Status</th>
                  <th className='text-center'>Action</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment.paymentId}>
                    <td>{index + 1}</td>
                    <td>{payment.paymentId}</td>
                    <td className='text-center'>{payment.controlNumber}</td>
                    <td className='text-center'>{payment.paidAmount}</td>
                    <td className='text-center'>{payment.paymentDate}</td>
                    <td className='text-center'>
                  {payment.application.amount - payment.paidAmount === 0 ? (
                    <span style={{ color: 'green' ,fontWeight: "bold"}}>Complete</span>
                  ) : (
                    <span style={{ color: 'red' , fontWeight: "bold"}}>Incomplete</span>
                  )}
                </td>
                    <td>
                      <Link to={`view-bill/${payment.application.applicationId}`} className='btn btn-outline-primary'> <i className='fa fa-eye'> </i> View bill</Link>
                      <button className='btn btn-outline-danger ms-3'><i className='fa fa-trash'> </i> delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card alert alert-primary  alert-dismissible fade show mt-5">
          <div className="card-body">
            <h5 className="card-title"><i className='fa fa-warning'> </i> No Payment Data Available</h5>
            <p className="card-text">Please generate a control number to proceed.</p>
          </div>
        </div>
      )}
    </div>
  );
};