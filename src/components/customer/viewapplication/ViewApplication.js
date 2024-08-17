import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, ToastPosition } from 'react-toastify';


export const ViewApplication = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState('');

  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(true);


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

    setTimeout(() => {
      setShowTable(true);
      setLoading(false);
    }, 900);
  }, []);

  const handleCancelApplication = (applicationId) => {
    axios.patch(`http://localhost:9000/api/review/applications/${applicationId}/cancel`)
      .then(response => {
        console.log(response.data);
        // setMessage('Application canceled successfully');
        toast.success("Canceled successfully", {
          className: "toast-success-inside",
          position: "top-right", // or "top-left", "bottom-right", "bottom-left"
          autoClose: 5000,

        });
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
        // setMessage('Document downloaded successfully');
        toast.success("Downloaded successfully", {
          className: "toast-success-inside",
          position: "top-right", // or "top-left", "bottom-right", "bottom-left"
          autoClose: 5000,

        });

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
          // setApplications(applications.filter (item => item.application.userId  !== userId));
          toast.success("Deleted successfully", {
            className: "toast-success-inside",
            position: "top-right", // or "top-left", "bottom-right", "bottom-left"
            autoClose: 5000,

          });
        })
        .catch(error => console.error("Error", error));

    }

  }

  return (
    <>
      <h5 className='fw-bold mb-5 text-uppercase'>Manage Application</h5>
      <ToastContainer />

      {/* {message && <div className="alert alert-info">{message}</div>} */}
      {loading ? (
        <strong>
          <i className='fa fa-spinner fa-spin'> </i> Loading...
        </strong>
      ) : (



        <>
          {showTable && (
            <>
              {applications.length > 0 ? (
                <><nav>

                  <button type='button' className='btn btn-outline-success mb-4'>
                    Total Application
                    <span className='badge bg-dark ms-1'>{applications.length}</span>
                  </button>
                </nav><div className='table table-responsive mt-2'>
                    <table className='table table-hover table-bordered'>
                      <thead>
                        <tr>
                          <th className='text-center p-2'>ID</th>
                          <th className='text-center'>Media Name</th>
                          <th className='text-center'>Service Name</th>
                          <th className='text-center'>Start Date</th>
                          <th className='text-center'>End Date</th>
                          <th className='text-center'>Total Day</th>
                          {/* <th className='text-center'>Total Amount</th> */}
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
                            {/* <td>{application.amount}</td> */}
                            {/* <td>{application.reviewApplication.reviewStatus}</td> */}
                            <td>
                              {application.reviewApplication.reviewStatus === 'Rejected' ? (
                                <span
                                  style={{
                                    backgroundColor: '#ffaf33',
                                    padding: '3px 10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    fontWeight:'bold'
                                  }}>
                                  {application.reviewApplication.reviewStatus}
                                </span>
                              ) : application.reviewApplication.reviewStatus === 'Canceled' ? (
                                <span
                                  style={{
                                    backgroundColor: '#FF0000',
                                    padding: '3px 10px',
                                    borderRadius: '5px',
                                    color: '#FFFFFF',
                                  }}>
                                  {application.reviewApplication.reviewStatus}
                                </span>
                              ) : application.reviewApplication.reviewStatus === 'Accepted' ? (
                                <span
                                  style={{
                                    backgroundColor: '#00FF7F',
                                    padding: '3px 10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    fontWeight:'bold'
                                  }}>
                                  {application.reviewApplication.reviewStatus}
                                </span>
                              ) : (
                                <span
                                  style={{
                                    backgroundColor: 'silver',
                                    padding: '3px 10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                  }}>
                                  {application.reviewApplication.reviewStatus}
                                </span>
                              )}
                            </td>
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
                                className='btn btn-outline-warning ms-2'
                                onClick={() => handleCancelApplication(application.applicationId)}
                                disabled={application.reviewApplication.reviewStatus !== 'pending'}
                              >
                                <i className='fa fa-ban'></i> Cancel
                              </button>
                              <button onClick={() => handleDelete(application.applicationId)}
                                className='btn btn-outline-danger ms-2'
                                disabled={application.reviewApplication.reviewStatus === "Accepted"}
                              >
                                <i className='fa fa-trash'></i> delete
                              </button>

                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div></>
              ) : (
                <div className="alert alert-primary  alert-dismissible fade show" role="alert">
                  No data found!
                </div>
              )}
            </>

          )}

        </>
        // loading
      )}
    </>
  );
};
