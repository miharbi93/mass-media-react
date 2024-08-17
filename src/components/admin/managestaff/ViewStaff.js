import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export const ViewStaff = () => {
  const [data, setData] = useState([]);
  const [staffCount, setStaffCount] = useState(0);


  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios.get('http://localhost:9000/api/staff/all')
  //     .then((response) => {
  //       setData(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error occur', error);
  //     });
  // }, []);

  const fetchStaff = () => {
    axios.get('http://localhost:9000/api/staff/all')
      .then(response => {
        // const filteredApplications = response.data.filter(application => application.customer.userId === userID);
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };


  useEffect(() => {
    fetchStaff();
    setTimeout(() => {
      setShowTable(true);
      setLoading(false);
    }, 900);
  }, [])

  useEffect(() => {
    fetch('http://localhost:9000/api/staff/count')
      .then(response => response.json())
      .then(data => setStaffCount(data));
  }, []);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete")) {
      axios.delete(`http://localhost:9000/api/staff/delete/${userId}`)
        .then(() => {
          setData(data.filter(item => item.userId !== userId));
          toast.success("Staff deleted successfully", {
            className: "toast-success-inside",
            position: "top-right", // or "top-left", "bottom-right", "bottom-left"
            autoClose: 5000,
          });
        })
        .catch(error => console.error(error));
    }
  }

  return (
    <>
      <h5 className='fw-bold mb-5 text-uppercase'>Manage Mass Media Staff</h5>
      {loading ? (
        <strong>
          <i className='fa fa-spinner fa-spin'> </i> Loading...
        </strong>
      ) : (
        <>
          {showTable && (
            <><nav>
              <Link to='new-staff'>
                <button className='btn btn-outline-success mb-4'>
                  <i className='fa fa-plus'> </i> <label> New Staff</label>
                </button>
              </Link>

              <button type='button' className='btn btn-outline-primary mb-4 ms-5'>
                Total Staff
                <span className='badge bg-danger ms-1'>{staffCount} </span>
              </button>
            </nav>
            <div className='table-responsive mt-2'>
                {data.length === 0 ? (

                  <div class="alert alert-primary  alert-dismissible fade show">
                    <strong>
                      <i className='fa fa-warning'> </i> Warning!
                    </strong>
                    <p className='mt-4'>No staff members available.</p>
                  </div>

                ) : (
                  <ToastContainer />
                  ,
                  <table className='table table-hover table-bordered'>
                    <thead>
                      <tr>
                        <th className='text-center'>SN</th>
                        <th className='text-center'>Staff Name</th>
                        <th className='text-center'>Email</th>
                        <th className='text-center'>Media Name</th>
                        <th className='text-center'>Media Type</th>
                        <th className='text-center'>Created Date</th>
                        <th className='text-center'>Staff Status</th>
                        <th className='text-center'>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((item, index) => (
                        <tr key={item.userId}>
                          <td className='text-center'>{index + 1}</td>
                          <td className='text-center'>{item.username}</td>
                          <td className='text-center'>{item.email}</td>
                          <td className='text-center'>{item.mediaChannel.mediaName}</td>
                          <td className='text-center'>{item.mediaChannel.mediaType}</td>
                          <th className='text-center'>{item.createdDate}</th>
                          {/* <td className='text-center'>{item.account_status}</td> */}
                          <td className='text-center'>

                            {item.account_status === 'Active' ? (
                              <span
                                style={{
                                  backgroundColor: '#00FF7F',
                                  padding: '5px 20px',
                                  borderRadius: '5px',
                                  color: 'black',
                                  fontWeight: 'bold',
                                }}>
                                {item.account_status}
                              </span>
                            ) : (
                              <span
                                style={{
                                  backgroundColor: '#FF0000',
                                  padding: '5px 20px',
                                  borderRadius: '5px',
                                  color: '#FFFFFF',
                                }}>
                                {item.account_status}
                              </span>
                            )}</td>
                          <td>
                            <Link to={`edit-staff/${item.userId}`} className='btn btn-outline-success'>
                              <i className='fa fa-edit'> Edit</i>
                            </Link>

                            <button onClick={() => handleDelete(item.userId)} className='btn btn-outline-danger ms-3'>
                              <i className='fa fa-trash'> Delete</i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </>

      )}
    </>
  );
};