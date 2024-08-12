import React, { useEffect, useState } from 'react';
import logo from '../../../circled-user-icon-.png';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, ToastPosition } from 'react-toastify';


export const EditCustomer = () => {

  const { userId } = useParams();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');
  const [existingImage, setExistingImage] = useState(null);
  const [role, setRole] = useState('Customer');
  const [account_status, setStatus] = useState('Active');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }
    const customer = {
      username,
      email,
      password: '',
      account_status: account_status,
      role,
    };
  
    const formData = new FormData();
    formData.append('customer', JSON.stringify(customer));
    if (image) {
      formData.append('image', image, 'image');
    }
  
    try {
      const response = await fetch(`http://localhost:9000/api/customer/update/${userId}`, {
        method: 'PATCH',
        body: formData,
      });
  
      if (response.ok) {
        toast.success("Updated successfully", {
          className: "toast-success-inside",
          position: "top-right", // or "top-left", "bottom-right", "bottom-left"
          autoClose: 4000,
        
        });


        setTimeout(()=>{

          navigate(-1 ,{
            replace:true,
            // state: { userRole: userData.role},
          });
        }, 4000);
        // navigate(-1); // redirect to customers list page
      } else {
        console.error('Error updating customer:', response.status);
      }
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleDefaultPassword = async () => {
    const defaultPassword = '0123';
    const customer = {
      username,
      email,
      password: defaultPassword,
      account_status,
      role,
    };

    const formData = new FormData();
    formData.append('customer', JSON.stringify(customer));
    if (image) {
      formData.append('image', image, 'image');
    }

    try {
      const response = await fetch(`http://localhost:9000/api/customer/update/${userId}`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        // alert('Default password set successfully');
        toast.success("Updated successfully", {
          className: "toast-success-inside",
          position: "top-right", // or "top-left", "bottom-right", "bottom-left"
          autoClose: 5000,
        
        });


        setTimeout(()=>{

          navigate('/view-customer',{
            replace:true,
            // state: { userRole: userData.role},
          });
        }, 5000);

      } else {
        console.error('Error setting default password:', response.status);
      }
    } catch (error) {
      console.error('Error setting default password:', error);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:9000/api/customer/byId/${userId}`)
     .then(response => {
        setUsername(response.data.username);
        setEmail(response.data.email);
        setRole(response.data.role);
        setStatus(response.data.account_status);
        setExistingImage(response.data.image); // set existing image
      })
  }, [userId]);

  return (
    <form onSubmit={handleSubmit}>

<ToastContainer/>

      <h5 className='fw-bold mb-2 text-uppercase'>Update Customer with ID {userId} </h5>
      <p className='mb-5'>Fill all required information</p>
      <div className='row'>
        <div className='row mb-4'>
          <div className='col-md-4'>
            <p className='form-label'>Username</p>
            <input
              type='text'
              className='form-control'
              placeholder='username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className='col-md-4'>
            <p className='form-label'>Email</p>
            <input
              type='text'
              className='form-control'
              placeholder='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className='col-md-4'>
            <p className='form-label'>Image</p>
            <input
              type='file'
              className='form-control'
              onChange={(event) => {
                console.log(event.target.files[0]);
                setImage(event.target.files[0]);
              }}
            />
          </div>

          <div className='col-md-4 mt-5'>
            <p className='form-label'>Status</p>
            <select
              className='form-control'
              value={account_status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value='Active'>Active</option>
              <option value='Inactive'>Inactive</option>
            </select>
          </div>
        </div>

        <div className='col-md-4 mt-5'>
          <button type='submit' className='btn btn-primary'>
            Update Customer
          </button>
        </div>

        <div className='col-md-4 mt-5'>
          <button type='button' className='btn btn-secondary w-50' onClick={handleDefaultPassword}>
            Set Default Password
          </button>
        </div>

        <div className='col-md-4 mt-5'>
        <button type='button' className='btn btn-danger w-50' onClick={() => navigate(-1)}>
          Back
        </button>
        </div>

      </div>
    </form>
  );
};