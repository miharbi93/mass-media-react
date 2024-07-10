import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, ToastPosition } from 'react-toastify';

export const NewService = () => {
  const navigate = useNavigate();
  const mediaID = localStorage.getItem('mediaId');

  const [formData, setFormData] = useState({
    serviceName: '',
    serviceDescription: '',
    servicePrice: '',
    serviceStatus: 'Active',
    mediaId: mediaID,
  });

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = {
      serviceId: 0,
      serviceName: formData.serviceName,
      serviceDescription: formData.serviceDescription,
      servicePrice: formData.servicePrice,
      serviceStatus: 'Active',
      mediaChannel: {
        mediaId: formData.mediaId,
      },
    };
    axios.post('http://localhost:9000/api/services/add', dataToSend)
     .then(response => {
        console.log(response.data);
        toast.success("Service created successfully", {
          className: "toast-success-inside",
          position: "top-right", // or "top-left", "bottom-right", "bottom-left"
          autoClose: 5000,
        
        });
        navigate(-1);
        // navigate(-1);
      })
     .catch(error => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className='fw-bold mb-2 text-uppercase'>Add New Service to media with ID {mediaID}</h5>
      <p className='mb-5'>Fill all required information</p>
      <div className='row'>
      
        <div className='row mb-4'>
          <div className='col-md-4'>
            <p className='form-label'>Service Name</p>
            <input type='text' name='serviceName' value={formData.serviceName} onChange={handleChange} className='form-control' placeholder='Service Name' />
          </div>
          <div className='col-md-4'>
            <p className='form-label'>Service Description</p>
            <input type='text' name='serviceDescription' value={formData.serviceDescription} onChange={handleChange} className='form-control' placeholder='Service Description' />
          </div>
          <div className='col-md-4'>
            <p className='form-label'>Service Price</p>
            <input type='text' name='servicePrice' value={formData.servicePrice} onChange={handleChange} className='form-control' placeholder='Service Price' />
          </div>
        </div>
        <div className='row mt-5 mb-5'>
          <div className='col-4'>
            <button type='submit' className='btn btn-primary w-50'>Save</button>
          </div>
          <div className='col-4'>
            <button type='button' onClick={() => navigate(-1)} className='btn btn-danger w-50'>Back</button>
          </div>
        </div>
      </div>
    </form>
  );
};