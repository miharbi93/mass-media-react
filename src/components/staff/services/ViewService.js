import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, ToastPosition } from 'react-toastify';

export const ViewService = () => {

    const [data, setData] = useState([]);

    const mediaId = localStorage.getItem('mediaId');

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async () => {
        try{
            const response = await axios.get(`http://localhost:9000/api/services/mediaId/${mediaId}`);
            setData(response.data);
            console.log(response.data);
        }catch(error){
            console.log(error);
        }
    }

    const handleDelete = (serviceId) => {

        if(window.confirm('Are you sure you want to delete?')){
        axios.delete(`http://localhost:9000/api/services/delete/${serviceId}`)
        .then(() =>{
            setData(data.filter(item => item.serviceId !== serviceId));
            // alert("Deleted successfull");
            toast.success("Deleted successfully", {
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
    <h5 className='fw-bold mb-5 text-uppercase'>Manage Service {mediaId}</h5>
    <nav>
        <Link to='new-service'>
            <button className='btn btn-outline-success mb-4'>
                <i className='fa fa-plus'> </i> <label> New Service</label>
            </button>
        </Link>

            <button type='button' className='btn btn-primary mb-4 ms-5'>
                Total Service
                <span className='badge bg-danger'> {data.length}</span>
            </button>
    </nav>

    {data.length === 0 ? 
    
    <div class="alert alert-primary  alert-dismissible fade show">
        <strong><i className='fa fa-warning'> </i> Warning!</strong> 
        <h6 className='mt-4'>No service Found.</h6>
    </div>: (
    <div className='table-responsive mt-2'>
        <table className='table table-hover table-bordered'>
            <thead>
                <tr>
                    <th>Service No</th>
                    <th>Service Name</th>
                    <th>Service Description</th>
                    {/* <th>Service Duration</th> */}
                    <th>Service Price</th>
                    {/* <th>Service Status</th> */}
                    <th>Actions</th>
                  </tr>
            </thead>
            <tbody>
                {data.map((item, index) =>(
                    <tr key={item.mediaId}>
                        <td>{index + 1}</td>
                        <td>{item.serviceName}</td>
                        <td>{item.serviceDescription}</td>
                        {/* <td>2 Days</td> */}
                        <td>{item.servicePrice}</td>
                        {/* <td>{item.serviceStatus}</td> */}
                        <td>
                            <Link to={`edit-service/${item.serviceId}`} className='btn btn-outline-success'><i className='fa fa-edit'> Edit</i></Link>
                                <button  onClick={() => handleDelete(item.serviceId)} className='btn btn-outline-danger ms-3'>
                                    <i className='fa fa-trash'> Delete </i>
                                </button>
                        </td>
                    </tr>

                ))}
              </tbody>
          </table>
      </div>
    )}
      </>
  )
}
