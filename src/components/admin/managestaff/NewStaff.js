import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';

export const NewStaff = () => {
  const navigate = useNavigate();

  const {userId} = useParams();

  const [massMediaChannel, setMassMediaChannel] = useState([]);
  const [massMediaId, setMassMediaId] = useState('');
  const [fullname, setFullName] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=>{
    axios.get('http://localhost:9000/api/channel/all')
    .then((response) =>{
        setMassMediaChannel(response.data);
    })
    .catch((error)=>{
        console.error('Error Occur', error);
    });
  },[]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedStaff = {
      username: fullname,
      email: email,
      password: password,
      role: 'Staff',
      status: 'Active',
      mediaChannel: {
        mediaId: massMediaId,
      },
    };
  
    axios.patch(`http://localhost:9000/api/staff/update/${userId}`, updatedStaff)
     .then((response) => {
        // console.log(response);
        toast.success("Staff updated successfully", {
          className: "toast-success-inside",
          position: "top-right", // or "top-left", "bottom-right", "bottom-left"
          autoClose: 5000,
        });
        navigate(-1);
      })
     .catch((error) => {
        console.error('Error Occur', error);
        if (error.response) {
          console.log('Error response:', error.response);
          if (error.response.status === 409) {
            setErrorMessage('Staff member already exists. Please try again.');
          } else {
            setErrorMessage(error.response.data.message);
          }
        } else {
          setErrorMessage('Unknown error occurred. Please try again.');
        }
      });
  };
  return (
    <form onSubmit={handleSubmit} noValidate>
      <ToastContainer/>
      <h5 className='fw-bold mb-2 text-uppercase'>Add New Media Channel Staff </h5>
      <p className='mb-5'>{errorMessage && <div className="alert alert-danger">{errorMessage}</div>}</p>

      <div className='row'>

        <div className='row mb-4'>
          <div className='col-md-6'>
            <label htmlFor='fullname' className='form-label'>Full Name</label>
            <input type='text' id='fullname' name='fullname' value={fullname} onChange={(event) => setFullName(event.target.value)} className='form-control' placeholder='username' required />
          </div>
          <div className='col-md-6'>
            <label htmlFor='email' className='form-label'>Email</label>
            <input type='email' id='email' name='email' value={email} onChange={(event) => setEmail(event.target.value)} className='form-control' placeholder='email' required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" />
          </div>
        </div>

        <div className='row mb-4'>

          <div className='col-md-6'>
            <label htmlFor='address' className='form-label'>Address</label>
            <input type='text' id='address' name='address' value={address} onChange={(event) => setAddress(event.target.value)} className='form-control' placeholder='address' />
          </div>
          <div className='col-md-6'>
            <label htmlFor='phonenumber' className='form-label'>Phonenumber</label>
            <input type='tel' id='phonenumber' name='phonenumber' value={phonenumber} onChange={(event) => setPhonenumber(event.target.value)} className='form-control' placeholder='phonenumber' />
          </div>
        </div>

        <div className='row mb-4'>
          <div className='col-md-6'>
            <label htmlFor='massMediaId' className='form-label'>Select Mass Media </label>
            <select id='massMediaId' name='massMediaId' value={massMediaId} onChange={(event) => setMassMediaId(event.target.value)} className='form-select' required>
              <option value="">None</option>
              {massMediaChannel.map((channel)=>(
                <option key={channel.mediaId} value={channel.mediaId}>
                  {channel.mediaName}
                </option>
              ))}
            </select>
          </div>
          {/* <div className='col-md-6'>
            <label htmlFor='passport' className='form-label'>Upload Passport size</label>
            <input type='file' id='passport' name='passport' className='form-control'/>
          </div> */}

        </div>

        <div className='row mb-4'>

          <div  className='col-md-6'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input type='password' id='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} className='form-control' placeholder='password' required minLength="8" maxLength="128" />
          </div>

          <div className='col-md-6'>
            <label htmlFor='confirmPassword' className='form-label'>Confirm Password</label>
            <input type='password' id='confirmPassword' name='confirmPassword' value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className='form-control' placeholder='confirm password' required minLength="8" maxLength="128" />
          </div>

        </div>

        <div className='row mb-4 mt-4'>

          <div className='col-md-6'>
            <button type='submit' className='btn btn-primary w-50'>Save</button>
          </div>

          <div className='col-md-6'>
            <button type='button' onClick={() => navigate(-1)} className='btn btn-danger w-50'>Back</button>
          </div>
        </div>
      </div>
    </form>

);
}