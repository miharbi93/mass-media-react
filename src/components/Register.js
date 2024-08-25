import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast, ToastPosition } from 'react-toastify';


export const Register = () => {

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
  
    // Check if email exists
    try {
      const response = await fetch(`http://localhost:9000/api/user/username/${email}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          toast.error("Email already exists", {
            className: "toast-error",
            position: "top-right", // or "top-left", "bottom-right", "bottom-left"
            autoClose: 5000,
          });
          return;
        }
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  
    if(password === confirmPassword){
    // If email does not exist, proceed with registration
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
        toast.success("Created successfully", {
          className: "toast-success",
          position: "top-right", // or "top-left", "bottom-right", "bottom-left"
          autoClose: 5000,
        });
  
        setTimeout(()=>{
          navigate('/',{
            replace:true,
            // state: { userRole: userData.role},
          });
        }, 5000);
      } else {
        console.error('Error creating customer:', response.status);
      }
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  }else{
    toast.error("Password does not match ", {
      className: "toast-error",
      position: "top-right", // or "top-left", "bottom-right", "bottom-left"
      autoClose: 5000,
    });
  }

}
  return (
    <div class="bg-light py-md-5 vh-100">

      <ToastContainer/>
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
            <div class="bg-white p-4 p-md-5 rounded shadow-sm ">
              <div class="row">
                <div class="col-12">
                  <div class="text-center mb-5">
                  <h3>
                    <span className='ms' style={{fontWeight:'bold'}}>MASS </span>
                       <span style={{fontWeight:'bold'}} >MEDIA </span> 
                       <span style={{fontWeight:'bold'}} 
                       className='ad'>ADVERTISING</span>
                      <span style={{fontWeight:'bold'}} className='hub'> HUB</span></h3>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
              <div className="row gy-3 gy-md-4 overflow-hidden">
                <div className='mt-5'>
                    <div className='row'>

                        <div className='col-6'>
                            <p  className="mb-1 form-label">Fullname</p>
                            <div className="input-group mb-4">
                                <input type="text" 
                                className="form-control" 
                                required
                                placeholder="Ex. Miharbi Rajab"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)} />
                            </div>
                        </div>

                        <div className='col-6'>
                            <p className='mb-1 form-label'>Email</p>
                            <div className='input-group mb-4'>
                                <input type='email' 
                                className='form-control' 
                                required
                                placeholder='Email'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)} />
                            </div>
                        </div>

                    </div>

                    <div className='row'>
                        <div className='col-12'>
                            <p className='mb-1 form-label'> Customer Image</p>
                            <div className='input-group mb-4'>
                                <input type='file' 
                                className='form-control mt-3' 
                                required
                                placeholder='Address' 
                                onChange={(event) => {
                                  console.log('Image uploaded:', event.target.files[0]);
                                  setImage(event.target.files[0]);
                                }}/>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-6'>
                            <p className='mb-1 form-label'>Password</p>
                            <div className='input-group mb-4'>
                                <input type='password' 
                                className='form-control' 
                                required
                                placeholder='Password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                            </div>
                        </div>

                        <div className='col-6'>
                          <p className='mb-1 form-label'>Confirm Password</p>
                          <div className='input-group mb-4'>
                            <input type='password' 
                            className='form-control' 
                            required
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                          </div>
                        </div>
                    </div>

                    <div className='row mt-4'>
                      <div class="col-12">
                        <div class="d-grid">
                          <button class="btn btn-primary btn-lg" type="submit">Create Account</button>
                        </div>
                      </div>
                    </div>

                  </div>
              </div>
               
              </form>
              <div class="row">
                <div class="col-md-12">
                  <hr class="mt-5 mb-4 border-secondary-subtle" />
                  <div class="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center">
                    <h6>Already have account ?  
                        <NavLink to="/"  className="link-primary text-decoration-none"> Login here</NavLink>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
