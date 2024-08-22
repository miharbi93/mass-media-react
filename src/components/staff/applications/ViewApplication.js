import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, ToastPosition } from 'react-toastify';

export const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState('');

  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(true);

  const mediaID = parseInt(localStorage.getItem('mediaId'));

  const fetchApplications = () => {
    axios.get('http://localhost:9000/api/applications/applications')
      .then(response => {
        const filteredApplications = response.data.filter(application => application.mediaId === mediaID);
        setApplications(filteredApplications);
      })
      .catch(error => {
        console.error(error);
        setMessage('Error fetching applications');
      });
  };

  useEffect(() => {
    fetchApplications();
    setTimeout(() => {
      setShowTable(true);
      setLoading(false);
    }, 900);
  }, []);

  const handlereivewstatusApplication = (applicationId) => {
    axios.patch(`http://localhost:9000/api/review/applications/${applicationId}/reivewstatus`)
      .then(response => {
        console.log(response.data);
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

  const handleDelete = (applicationId) => {
    if (window.confirm("Are you sure you want to delete")) {
      axios.delete(`http://localhost:9000/api/applications/delete/${applicationId}`)
        .then(() => {
          fetchApplications();
          toast.success("Deleted successfully", {
            className: "toast-success-inside",
            position: "top-right", // or "top-left", "bottom-right", "bottom-left"
            autoClose: 5000,
          });
        })
        .catch(error => console.error("Error", error));
    }
  };

  return (
    <div>
      <ToastContainer />
      <h5 className='fw-bold mb-5 text-uppercase'>Manage Application </h5>

      {loading ? (
        <strong>
          <i className='fa fa-spinner fa-spin'> </i> Loading...
        </strong>
      ) : (
        <div>
          {showTable && (
            <div>
              {applications.length === 0 ? (
                <div className="card  alert alert-primary  alert-dismissible fade show">
                  <div className="card-body">
                    <h5 className="card-title"><i className='fa fa-warning'> </i>  No applications</h5>
                    <p className="card-text">There are no applications to display.</p>
                  </div>
                </div>
              ) : (
                <div>
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
                          <th className='text-center p-2'>SN</th>
                          <th className='text-center'>APP ID</th>
                          <th className='text-center'>Customer Name</th>
                          <th className='text-center'>Email</th>
                          <th className='text-center'>Service Name</th>
                          <th className='text-center'>Start Date</th>
                          <th className='text-center'>End Date</th>
                          {/* <th className='text-center'>Day</th> */}
                          <th className='text-center'>Amount</th>
                          <th className='text-center'>Advertise Doc</th>
                          <th className='text-center'>Uthibitisho Doc</th>
                          <th className='text-center'>Status</th>
                          <th className='text-center'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((application, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>#00{application.applicationId}</td>
                            <td>{application.username}</td>
                            <td>{application.email}</td>
                            <td>{application.mediaServiceName}</td>
                            <td>{application.startDate}</td>
                            <td>{application.endDate}</td>
                            {/* <td>{application.dayPackage}</td> */}
                            <td>TZS {application.amount}</td>
                            <td>
                              <button className='btn btn-primary' onClick={() => handleDownloadDocument(application.applicationId, 'advertise')}>
                                <i className='fa fa-download'> </i> Download
                              </button>
                            </td>
                            <td>
                              <button className='btn  btn-primary' onClick={() => handleDownloadDocument(application.applicationId, 'uthibitisho')}>
                                <i className='fa fa-download'></i> Download
                              </button>
                            </td>
                            <td>
                              <button 
                                disabled={application.status === 'Cancel'}
                                onClick={() => handlereivewstatusApplication(application.applicationId)}
                                className={`btn ${application.status === 'Accepted' ? 'btn-success' : application.status === 'Rejected' ? 'btn-warning' : 'btn-dark'
                                }`}>{application.status}</button>
                            </td>
                            <td>
                              <button onClick={() => handleDelete(application.applicationId) }
                                className='btn btn-outline-danger ms-2'
                              >
                                <i className='fa fa-trash'></i> delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};