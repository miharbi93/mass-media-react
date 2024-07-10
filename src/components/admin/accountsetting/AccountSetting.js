import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const AccountSetting = () => {
  const [data, setData] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // const user = 'admin@gmail.com';
  const user = localStorage.getItem('email');

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    axios.get(`http://localhost:9000/api/user/username/${user}`)
      .then((response) => {
        setData(response.data);
        setUsername(response.data.username)
        setEmail(response.data.email)
        // setOldPassword(response.data.password)
        
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (oldPassword === data.password) {
      if (newPassword === confirmNewPassword) {
        axios.patch(`http://localhost:9000/api/user/update/${userId}`, {
          username,
          email,
          password: newPassword,
        })
          .then((response) => {
            setSuccess('Profile and password updated successfully!');
            setError(null);
          })
          .catch((error) => {
            setError(error.message);
            setSuccess(null);
          });
      } else {
        setError('New password and confirm new password do not match');
        setSuccess(null);
      }
    } else {
      setError('Old password does not match');
      setSuccess(null);
    }
  };

  return (
    <form>
      <h5 className='fw-bold mb-2 text-uppercase'>Account Setting {data.username}</h5>
      <p className='mb-2'>You can update the Account Information</p>

      <div className='row mt-5 mb-5'>

      {error && <div className='alert alert-danger'>{error}</div>}
      {success && <div className='alert alert-success'>{success}</div>}
      
        <div className='col-md-6'>
          <p className='form-label'>Username</p>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='form-control'
          />
        </div>

        <div className='col-md-6'>
          <p className='form-label'>Email</p>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='form-control'
          />
        </div>
      </div>

      <div className='row mt-4 mb-5'>
        <div className='col-md-6'>
          <p className='form-label'>Old Password</p>
          <input
            type='password'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className='form-control'
            placeholder='old password' required
          />
        </div>

        <div className='col-md-5'>
          <p className='form-label'>New Password</p>
          <input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='form-control'
            placeholder='new password' required
          />
        </div>

        <div className='col-md-5 mt-5'>
          <p className='form-label'>Confirm New Password</p>
          <input
            type='password'
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className='form-control'
            placeholder='confirm new password' required
          />
        </div>
      </div>

      <div className='row mt-5'>
        <div className='col-md-6 mt-4'>
          <button onClick={handleUpdate} className='btn btn-primary w-50'>
            Update Profile and Password
          </button>
        </div>
      </div>
    </form>
  );
};