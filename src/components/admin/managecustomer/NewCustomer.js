import React, { useState } from 'react';
import logo from '../../../circled-user-icon-.png';
import { useNavigate } from 'react-router-dom';

export const NewCustomer = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [role, setRole] = useState('Customer');
  const [account_status, setStatus] = useState('Active'); // add a new state for status with default value 'Active'

  const handleSubmit = async (event) => {
    event.preventDefault();
    const customer = {
      username,
      email,
      password,
      account_status,
      role,
    };

    const formData = new FormData();
    formData.append('customer', JSON.stringify(customer));
    formData.append('image', image, 'image'); // specify the name attribute as 'image'

    console.log('Form data:', formData);

    try {
      const response = await fetch('http://localhost:9000/api/customer/add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        navigate(-1); // redirect to customers list page
      } else {
        console.error('Error creating customer:', response.status);
      }
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className='fw-bold mb-2 text-uppercase'>Add New Customer </h5>
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
                console.log('Image uploaded:', event.target.files[0]);
                setImage(event.target.files[0]);
              }}
            />
          </div>
        </div>

        <div className='row mb-4 mt-4'>
          <div className='col-md-4'>
            <p className='form-label'>Password</p>
            <input
              type='password'
              className='form-control'
              placeholder='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className='col-md-4'>
            <p className='form-label'>Confirm Password</p>
            <input
              type='password'
              className='form-control'
              placeholder='confirm password'
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
        </div>

        <div className='row mb-4 mt-5'>
          <div className='col-md-6'>
            <button className='btn btn-primary w-50'>Save</button>
          </div>

          <div className='col-md-6'>
            <button
              type='button'
              onClick={() => navigate(-1)}
              className='btn btn-danger w-50'
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};