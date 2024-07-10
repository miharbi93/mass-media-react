import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, json } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, ToastPosition } from 'react-toastify';

export const ViewCustomer = () => {

    const [data, setData] = useState([]);
    const [countCustomer, setCountCustomer] = useState(0);

    useEffect(()=>{
        axios.get('http://localhost:9000/api/customer/all')
        .then((response) =>{
            console.log(response.data);
            setData(response.data);
        })
        .catch((error)=>{
            console.error("Error",error);
        });
    },[]);

    useEffect(()=>{
        axios.get('http://localhost:9000/api/customer/count')
        .then((response) =>{
            setCountCustomer(response.data)
        })
    },[]);

    const handleDelete = (userId) =>{
        if(window.confirm("Are you sure you want to delete")){
            axios.delete(`http://localhost:9000/api/customer/delete/${userId}`)
            .then(()=>{
                setData(data.filter (item => item.userId  !== userId));
                toast.success("Deleted successfully", {
                    className: "toast-success-inside",
                    position: "top-right", // or "top-left", "bottom-right", "bottom-left"
                    autoClose: 5000,
                  
                  });
            })
            .catch(error => console.error("Error",error));

    }

}

  return (
    <>
    <h5 className='fw-bold mb-5 text-uppercase'>Manage Mass Media Customer </h5><nav>
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
        <div className='table-responsive mb-4'>
            <ToastContainer/>
            <table className='table table-hover table-bordered'>
                <thead>
                    <tr>
                        <th className='text-center'>Customer ID</th>
                        <th className='text-center'>Image</th>
                        <th className='text-center'>Name</th>
                        <th className='text-center'>Email</th>
                        <th className='text-center'>Created Date</th>
                        <th className='text-center'>Status</th>
                        <th className='text-center'>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item,index) =>(
                        <tr key={item.userId}>
                            <td className='p-4'>{index + 1}</td>
                            <td className='p-3'>
                                <img className='table-image' src={`data:image/png;base64,${item.customerImage}`} />
                            </td>
                            <td className='p-4'>{item.username}</td>
                            <td className='p-4'>{item.email}</td>
                            <td className='p-4'>{item.createdDate}</td>
                            <td className='p-4'>{item.status}</td>
                            <td className='p-4'>
                                <Link to={`edit-customer/${item.userId}`} className='btn btn-outline-success'>
                                    <i className='fa fa-edit'> </i> Edit</Link>
                                <button onClick={() => handleDelete(item.userId) } className='btn btn-outline-danger ms-3'>
                                    <i className='fa fa-trash'> </i> Delete</button>
                            </td>
                        </tr>

                    ))}
                    
                </tbody>
            </table>

        </div>
        </>
  )
}
