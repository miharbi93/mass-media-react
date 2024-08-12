import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // add axios for making API requests
import { ToastContainer, toast, ToastPosition } from 'react-toastify';


export const EditService = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [service, setService] = useState({}); // add state to store service data

  useEffect(() => {
    // make GET request to fetch service data
    axios.get(`http://localhost:9000/api/services/id/${serviceId}`)
      .then(response => {
        setService(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [serviceId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // make PUT request to update service data
    axios.put(`http://localhost:9000/api/services/update/${serviceId}`, service)
      .then(response => {
        toast.success("Updated successfully", {
            className: "toast-success-inside",
            position: "top-right", // or "top-left", "bottom-right", "bottom-left"
            autoClose: 2000,
          
          });
        // navigate(-1); // go back to previous page after update

        setTimeout(()=>{

            navigate(-1 ,{
              replace:true,
            });
          }, 2000);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setService({ ...service, [name]: value });
  };

  return (
    <>
      <h5 className='fw-bold mb-5 text-uppercase'>Update Service {serviceId}</h5>
      {/* <p className='mb-5'>Fill all required information</p> */}

      <ToastContainer/>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='row mb-4'>
            <div className='col-md-6'>
              <p className='form-label'>Service Name</p>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Service Name'
                  name='serviceName'
                  value={service.serviceName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='col-md-6'>
              <p className='form-label'>Service Description</p>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Service Description'
                  name='serviceDescription'
                  value={service.serviceDescription}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className='row mb-4 mt-5'>
            <div className='col-md-4'>
              <p className='form-label'>Service Price</p>
              <div className='input-group'>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Service Price'
                  name='servicePrice'
                  value={service.servicePrice}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className='row mt-5 mb-5'>
            <div className='col-4'>
              <button type='submit' className='btn btn-primary w-50'>Update</button>
            </div>

            <div className='col-4'>
              <button type='button' onClick={() => navigate(-1)} className='btn btn-danger w-50 float-start'>Back</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};