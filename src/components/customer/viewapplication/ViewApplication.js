import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const ViewApplication = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState('');

  const userID = parseInt(localStorage.getItem('userId'));

  const fetchApplications = () => {
    // axios.get('http://localhost:9000/api/applications/all')
    axios.get(`http://localhost:9000/api/applications/customers/${userID}/applications`)
      .then(response => {
        // const filteredApplications = response.data.filter(application => application.customer.userId === userID);
        setApplications(response.data);
      })
      .catch(error => {
        console.error(error);
        setMessage('Error fetching applications');
      });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleCancelApplication = (applicationId) => {
    axios.patch(`http://localhost:9000/api/review/applications/${applicationId}/cancel`)
      .then(response => {
        console.log(response.data);
        setMessage('Application canceled successfully');
        fetchApplications(); // Refetch applications after canceling
      })
      .catch(error => {
        console.error(error);
        setMessage('Error canceling application');
      });
  };

  const handleDownloadDocument = (applicationId, documentType) => {
    axios.get(`http://localhost:9000/api/applications/${applicationId}/${documentType}Document`, {
      responseType: 'arraybuffer'
    })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${documentType}Document.pdf`;
        link.click();
        URL.revokeObjectURL(url);
        setMessage('Document downloaded successfully');
      })
      .catch(error => {
        console.error(error);
        setMessage('Error downloading document');
      });
  };

  return (
    <>
      <h5 className='fw-bold mb-5 text-uppercase'>Manage Application</h5>

      {message && <div className="alert alert-info">{message}</div>}
      {applications.length === 0 ? (
        <div className="card bg-warning">
          <div className="card-body">
            <h5 className="card-title"><i className='fa fa-warning'> </i> {userID} No applications</h5>
            <p className="card-text">There are no applications to display.</p>
          </div>
        </div>
      ) : (
        <>
          <nav>
            <button type='button' className='btn btn-outline-success mb-4'>
              Total Application
              <span className='badge bg-dark ms-1'>{applications.length}</span>
            </button>
          </nav>
          <div className='table table-responsive mt-2'>
            <table className='table table-hover table-bordered'>
              <thead>
                <tr>
                  <th className='text-center p-2'>ID</th>
                  <th className='text-center'>Media Name</th>
                  <th className='text-center'>Service Name</th>
                  <th className='text-center'>Start Date</th>
                  <th className='text-center'>End Date</th>
                  <th className='text-center'>Day</th>
                  <th className='text-center'>Total Amount</th>
                  <th className='text-center'>Status</th>
                  <th className='text-center'>Advertise Doc</th>
                  <th className='text-center'>Uthibitisho Doc</th>
                  <th className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{application.mediaService.mediaChannel.mediaName}</td>
                    <td>{application.mediaService.serviceName}</td>
                    <td>{application.startDate}</td>
                    <td>{application.endDate}</td>
                    <td>{application.dayPackage}</td>
                    <td>{application.amount}</td>
                    <td>{application.reviewApplication.reviewStatus}</td>
                    <td>
                      <button className='btn btn-primary' onClick={() => handleDownloadDocument(application.applicationId, 'advertise')}>
                        <i className='fa fa-download'> </i> Download
                      </button>
                    </td>
                    <td>
                      <button className='btn btn-primary' onClick={() => handleDownloadDocument(application.applicationId, 'uthibitisho')}>
                        <i className='fa fa-download'></i> Download
                      </button>
                    </td>
                    <td>
                      <button className='btn btn-outline-info'>
                        <i className='fa fa-eye'></i> View
                      </button>
                      <button
                        className='btn btn-outline-danger ms-2'
                        onClick={() => handleCancelApplication(application.applicationId)}
                        disabled={application.reviewApplication.reviewStatus === 'Cancel'}
                      >
                        <i className='fa fa-ban'></i> Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};
