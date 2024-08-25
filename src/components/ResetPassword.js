import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast, ToastPosition } from 'react-toastify';
import { Link } from 'react-router-dom';


export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:9000/api/user/username/${email}`)
      .then(response => {
        if (response.status === 200) {
          // Email exists, send request to reset password
          axios.patch(`http://localhost:9000/api/user/resetpassword/${email}`)
            .then(response => {
              setAlertMessage('Password reset link sent to your email!');
              setAlertType('success');
            })
            .catch(error => {
              console.error(error);
              setAlertMessage('Error occurred while sending password reset link!');
              setAlertType('danger');
            });
        } else {
          // setAlertMessage('Email not found!');

          toast.error("Email not found!", {
            className: "toast-error",
            position: "top-right", // or "top-left", "bottom-right", "bottom-left"
            autoClose: 5000,
          
          });
          setAlertType('warning');
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          // setAlertMessage('Email not found!');
          toast.error("Email not found!", {
            className: "toast-error",
            position: "top-right", // or "top-left", "bottom-right", "bottom-left"
            autoClose: 5000,
          
          });
          setAlertType('warning');
        } else {
          console.error(error);
          setAlertMessage('Error occurred!');
          setAlertType('danger');
        }
      });
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', width: '250%' }}>
      <ToastContainer/>
      <div className="panel panel-default shadow-lg p-3 mb-5 bg-white rounded" style={{ width: '30%' }}>
        <div className="panel-body">
          <div className="text-center">
            <h3><i className="fa fa-lock fa-4x"></i></h3>
            <h2 className="text-center">Forgot Password?</h2>
            <p>You can reset your password here.</p>
            <form className="form">
              <fieldset>
                <div className="form-group mt-3">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                    <input  placeholder="Email Address" className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <div className="text-center mt-5">
                  <div className="form-group mb-5">
                    {/* <button className="btn btn-primary" onClick={handleResetPassword}>Reset Password</button> */}
                    <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleResetPassword}>Reset Password</button>
                  </div>
                </div>

                <Link to='/' className='link-primary text-decoration-none'>Back to login</Link>
                {alertMessage && (
                  <div className={`alert alert-${alertType}`} role="alert">
                    {alertMessage}
                  </div>
                )}
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};