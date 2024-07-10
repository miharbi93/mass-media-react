import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../download.png'
import logo3 from '../../../images (52).png'
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, ToastPosition } from 'react-toastify';

export const ViewChannels = () => {


    const [data, setData] = useState([]);

    const [countChannel, setCountChannel] = useState(0);

    useEffect(()=>{
        axios.get('http://localhost:9000/api/channel/all')
        .then((response)=>{
            setData(response.data);
            console.log(response.data);
        })
        .catch((error)=>{
            console.error('Error',error);
        })
    },[]);

    useEffect(()=>{
        fetch('http://localhost:9000/api/channel/count')
        .then(response => response.json())
        .then(data => setCountChannel(data));
    },[]);

    const handleDelete = (mediaId) =>{
        if(window.confirm("Are you sure you want to delete")){
            axios.delete(`http://localhost:9000/api/channel/delete/${mediaId}`)
            .then(() =>{
                setData(data.filter (item => item.mediaId !== mediaId));
                // alert("Deleted");
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
    <h5 className='fw-bold mb-5 text-uppercase'>Manage Mass Media Channel </h5>
    <nav>
        <Link to='new-channel'>
            <button className='btn btn-outline-success mb-4'>
                <i className='fa fa-plus'> </i> <label> New Channel</label>
            </button>
        </Link>

        <button type='button' className='btn btn-outline-info mb-4 ms-5'>
            Total Channel
            <span className='badge bg-danger ms-2'> {countChannel}</span>
        </button>
    </nav>

    <div className='table-responsive mt-2'>
        <ToastContainer/>
        <table className=' table table-hover table-bordered'>
            <thead>
                <tr>
                    <th className='text-center '>Media Logo</th>
                    <th className='text-center'>Media No </th>
                    <th className='text-center'>Media Name</th>
                    <th className='text-center'>Media Type</th>
                    <th className='text-center'>Media Email</th>
                    {/* <th className='text-center'>Media WebUrl</th> */}
                    <th className='text-center'>Created Date</th>
                    <th className='text-center'>Status</th>
                    <th className='text-center'>Action</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item,index)=>(
                    <tr key={item.mediaId}>
                    <td className='p-1'>
                        <img className='table-image' src={`data:image/png;base64,${item.image}`}/>
                    </td>
                    <td className='p-4'>{item.mediaId}</td>
                    <td className='p-4'>{item.mediaName}</td>
                    <td className='p-4'>{item.mediaType}</td>
                    <td className='p-4'>{item.mediaEmail}</td>
                    {/* <td className='p-4'>{item.mediaWebUrl}</td> */}
                    <td className='p-4'>{item.createdDate}</td>
                    <td className='p-4'>{item.status === 'Open' ? (
                        <span
                            style={{
                                backgroundColor: '#00FF7F',
                                padding: '3px 15px',
                                borderRadius: '5px',
                                color: 'black',

                            }}>
                                {item.status}
                        </span>
                    ):(
                        <span
                            style={{
                                backgroundColor: '#FF0000',
                                padding: '3px 10px',
                                borderRadius: '5px',
                                color: '#FFFFFF',

                            }}>
                                {item.status}
                        </span>

                    )}</td>
                    <td className='p-4'>

                        <Link to={`edit-channel/${item.mediaId}`} className='btn btn-outline-success '>
                            <i className='fa fa-edit'> Edit</i>
                        </Link>

                        <button onClick={() => handleDelete(item.mediaId)} className='btn btn-outline-danger ms-3'>
                            <i className='fa fa-trash'> Delete</i>
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        
    </div>
    </>
  )
}
