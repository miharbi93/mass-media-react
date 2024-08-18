import React, { useEffect, useState } from 'react';
import logo from '../../../circled-user-icon-.png';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, ToastPosition } from 'react-toastify';

export const CustomerAccount = () => {
  const navigate = useNavigate();
  const userId = parseInt(localStorage.getItem('userId'));

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
      // alert('New password and confirm password do not match');
      toast.error("Passwords does not match", {
        className: "toast-error-inside",
        position: "top-right", // or "top-left", "bottom-right", "bottom-left"
        autoClose: 4000,
      });
      return;
    }
    const customer = {
      username,
      email,
      password,
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
        toast.success("Updated successfully", {
          className: "toast-success-inside",
          position: "top-right", // or "top-left", "bottom-right", "bottom-left"
          autoClose: 4000,
        });
      } else {
        console.error('Error updating customer:', response.status);
      }
    } catch (error) {
      console.error('Error updating customer:', error);
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
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className='col-md-4'>
            <p className='form-label'>Email</p>
            <input
              type='email'
              className='form-control'
              placeholder='email'
              required
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
            <p className='form-label'>Password</p>
            <input
              type='password'
              className='form-control'
              placeholder='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className='col-md-4 mt-5'>
            <p className='form-label'>Confirm Password</p>
            <input
              type='password'
              className='form-control'
              placeholder='confirm password'
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>

          <div className='col-md-4 mt-5'>
            <p className='form-label'>Status</p>
            <input
              type='text'
              className='form-control'
              placeholder='password'
              value={account_status}
              readOnly
              onChange={(event) => setStatus(event.target.value)}
            />
            {/* <select
              className='form-control'
              value={account_status}
              
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value='Active'>Active</option>
              <option value='Inactive'>Inactive</option>
            </select> */}
          </div>
        </div>

        <div className='col-md-6 mt-5'>
          <button type='submit' className='btn btn-primary'>
            Update Information
          </button>
        </div>

      </div>
    </form>
  );
};