import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, json } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, ToastPosition } from 'react-toastify';

export const ViewCustomer = () => {

  const [data, setData] = useState([]);
  const [countCustomer, setCountCustomer] = useState(0);


  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(true);


  const fetchCustomers = () => {
    axios.get('http://localhost:9000/api/customer/all')
      .then(response => {
        // const filteredApplications = response.data.filter(application => application.customer.userId === userID);
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchCustomers();
    setTimeout(() => {
      setShowTable(true);
      setLoading(false);
    }, 900);
  }, [])

  useEffect(() => {
    axios.get('http://localhost:9000/api/customer/count')
      .then((response) => {
        setCountCustomer(response.data)
      })
  }, []);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete")) {
      axios.delete(`http://localhost:9000/api/customer/delete/${userId}`)
        .then(() => {
          setData(data.filter(item => item.userId !== userId));
          fetchCustomers();
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
      <h5 className='fw-bold mb-5 text-uppercase'>Manage Mass Media Customer </h5>
      {loading ? (
        <strong>
          <i className='fa fa-spinner fa-spin'> </i> Loading...
        </strong>
      ) : (
        <>
          {showTable && (
            <><div className='table-responsive mb-4'>
              <ToastContainer />
              {data.length === 0 ? (
                <><nav>
                    <Link to='new-customer'>
                      <button className='btn btn-outline-success mb-4'>
                        <i className='fa fa-plus'> </i> <label> New Customer</label>
                      </button>
                    </Link>

                    <button type='button' className='btn btn-outline-primary mb-4 ms-5'>
                      Total Customer
                      <span className='badge bg-danger ms-2'> {countCustomer}</span>
                    </button>
                  </nav><div class="alert alert-primary  alert-dismissible fade show">
                      <strong>
                        <i className='fa fa-warning'> </i> Warning!
                      </strong>
                      <p className='mt-4'>No customers are available.</p>
                    </div></>
              ) : (
                <>
                <nav>
                  <Link to='new-customer'>
                    <button className='btn btn-outline-success mb-4'>
                      <i className='fa fa-plus'> </i> <label> New Customer</label>
                    </button>
                  </Link>

                  <button type='button' className='btn btn-outline-primary mb-4 ms-5'>
                    Total Customer
                    <span className='badge bg-danger ms-2'> {countCustomer}</span>
                  </button>
                </nav>
                <table className='table table-hover table-bordered'>
                    <thead>
                      <tr>
                        <th className='text-center'> SN</th>
                        <th className='text-center'>Image</th>
                        <th className='text-center'>Name</th>
                        <th className='text-center'>Email</th>
                        <th className='text-center'>Created Date</th>
                        <th className='text-center'>Status</th>
                        <th className='text-center'>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((item, index) => (
                        <tr key={item.userId}>
                          <td className='p-4'>{index + 1}</td>
                          <td className='p-3'>
                            <img className='table-image' src={`data:image/png;base64,${item.customerImage}`} />
                          </td>
                          <td className='p-4'>{item.username}</td>
                          <td className='p-4'>{item.email}</td>
                          <td className='p-4'>{item.createdDate}</td>
                          {/* <td className='p-4'>{item.account_status}</td> */}
                          <td className='p-4'>{item.account_status === 'Active'? (
                          <span
                            style={{
                              backgroundColor: '#00FF7F',
                              padding: '3px 15px',
                              borderRadius: '5px',
                              color: 'black',
                              fontWeight: 'bold'
                            }}>
                            {item.account_status}
                          </span>
                        ) : (
                          <span
                            style={{
                              backgroundColor: '#FF0000',
                              padding: '3px 10px',
                              borderRadius: '5px',
                              color: '#FFFFFF',
                              fontWeight: 'bold'
                            }}>
                            {item.account_status}
                          </span>
                        )}</td>
                          <td className='p-4'>
                            <Link to={`edit-customer/${item.userId}`} className='btn btn-outline-success'>
                              <i className='fa fa-edit'> </i> Edit</Link>
                            <button onClick={() => handleDelete(item.userId)} className='btn btn-outline-danger ms-3'>
                              <i className='fa fa-trash'> </i> Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table></>
              )}
            </div>

            </>
          )}
        </>

      )}
    </>
  )

}