import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const ViewApplication = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9000/api/applications/all')
      .then(response => {
        setApplications(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [selectedApplication]);

  const handleCancelApplication = (applicationId) => {
    axios.patch(`http://localhost:9000/api/review/applications/${applicationId}/cancel`)
      .then(response => {
        console.log(response.data);
        setSelectedApplication(applicationId);
      })
      .catch(error => {
        console.error(error);
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
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <h5 className='fw-bold mb-5 text-uppercase'>Manage Application</h5>
      <nav>
        <button type='button' className='btn btn-outline-success mb-4'>
          Total Application
          <span className='badge bg-dark ms-1'>88 </span>
        </button>
      </nav>
      <div className='table table-responsive mt-2'>
        <table className='table table-hover table-bordered'>
          <thead>
            <tr>
              <th className='text-center p-2'>ID</th>
              {/* <th>Name</th> */}
              <th className='text-center'>Media Name</th>
              {/* <th>Media Type</th> */}
              <th className='text-center'>Service Name</th>
              {/* <th>Application Date</th> */}
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

                {/* <td>{application.customer.username}</td> */}

                <td>{application.mediaService.mediaChannel.mediaName}</td>
                {/* <td>{application.mediaService.mediaChannel.mediaType}</td> */}
                <td>{application.mediaService.serviceName}</td>
                {/* <td>{application.applicationDate}</td> */}

                <td>{application.startDate}</td>
                <td>{application.endDate}</td>

                <td>{application.dayPackage}</td>
                <td>{application.amount}</td>
                <td>{application.reviewApplication.reviewStatus}</td>
                {/* <td></td> */}

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
                  <button className='btn btn-outline-info'><i className='fa fa-eye'></i> View</button>
                  <button className='btn btn-outline-danger ms-2' onClick={() => handleCancelApplication(application.applicationId)}
                    disabled={application.reviewApplication.reviewStatus === 'Cancel'}>
                    <i className='fa fa-ban'></i> Cancel
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};