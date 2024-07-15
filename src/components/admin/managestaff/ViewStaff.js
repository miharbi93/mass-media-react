import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export const ViewStaff = () => {
  const [data, setData] = useState([]);
  const [staffCount, setStaffCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:9000/api/staff/all')
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error occur', error);
      });
  }, []);

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
      <nav>
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

      {data.length > 0 ? (
        <div className='table-responsive mt-2'>
          <ToastContainer />
          <table className='table table-hover table-bordered'>
            <thead>
              <tr>
                <th>Staff No</th>
                <th>Staff Name</th>
                <th>Email</th>
                <th>Media Name</th>
                <th>Created Date</th>
                <th>Staff Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={item.userId}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.mediaChannel.mediaName}</td>
                  <th>{item.createdDate}</th>
                  <td>{item.account_status}</td>
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
        </div>
      ) : (
        // <div className='card mt-2 bg-warning'>
        //   <div className='card-body'>
        //     <h5 className='card-title'><i className='fa fa-warning'></i> No Staff Available</h5>
        //     <p className='card-text'>There are no staff members available.</p>
        //   </div>
        // </div>

        <div class="alert alert-warning  alert-dismissible fade show">
            <strong>
                <i className='fa fa-warning'> </i> Warning!
            </strong> No Staff Available
            <p className='mt-4'>There are no staff members available.</p>
        </div>
      )}
    </>
  );
};