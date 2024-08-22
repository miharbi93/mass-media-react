import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, ToastPosition } from 'react-toastify';
import Logo from '../circled-user-icon-.png'

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) =>{
    event.preventDefault();
    try{
      const response  = await axios.get(`http://localhost:9000/api/user/usernames/${email}`, {
        params: {
          password: password
        }
      });

      const userData = await response.data;

      if(userData){
        if(userData.role === 'Staff'){

          toast.success("Login successfully", {
            className: "toast-success",
            position: "top-right", // or "top-left", "bottom-right", "bottom-left"
            autoClose: 5000,
          
          });

          localStorage.setItem('userRole', userData.role);
          localStorage.setItem('userId', userData.userId);
          localStorage.setItem('name', userData.mediaChannel.mediaName);
          localStorage.setItem('image',userData.mediaChannel.image);
          localStorage.setItem('mediaId', userData.mediaChannel.mediaId);

          setTimeout(()=>{
            navigate('/staff-dashboard',{
              replace:true,
              state: { userRole: userData.role},
            });
          }, 5000);
        }

        if(userData.role === 'Admin'){

          toast.success("Login successfully", {
            className: "toast-success",
            position: "top-right", // or "top-left", "bottom-right", "bottom-left"
            autoClose: 5000,
          
          });

          localStorage.setItem('name',userData.username);
          localStorage.setItem('email',userData.email);
          localStorage.setItem('userId', userData.userId);
          localStorage.setItem('image',Logo);
          localStorage.setItem('userRole', userData.role);

          setTimeout(()=>{
            navigate('/admin-dashboard',{
              replace:true,
              state: { userRole: userData.role},
            });
          }, 3000);
        }

        if(userData.role === 'Customer'){

          toast.success("Login successfully", {
            className: "toast-success",
            position: "top-right", // or "top-left", "bottom-right", "bottom-left"
            autoClose: 5000,
          
          });

          localStorage.setItem('name',userData.username);
          localStorage.setItem('image',userData.customerImage)
          localStorage.setItem('userRole', userData.role);
          localStorage.setItem('userId', userData.userId);

          setTimeout(()=>{
            navigate('/dashboard',{
              replace:true,
              state: { userRole: userData.role},
            });
          }, 3000);
        }

      }else{
        setError("Incorrect username or password");
        toast.error("Invalid username or password ", {
          className: "toast-error",
          position: 'top-right',
          autoClose: 5000,
        });
      }
    }catch(error){
      toast.error("Cridential Not Found", {
        className: "toast-error",
        position: 'top-right',
        autoClose: 5000,
      });

      console.error(error);
    }
  }


  const location = useLocation();

  useEffect(() => {

    if (location.pathname === '/') {

      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      localStorage.removeItem('name');
      localStorage.removeItem('image');
      localStorage.removeItem('email');
      localStorage.removeItem('mediaId');

    }

  }, [location]);


  return (
    <div class="bg-light py-md-5 vh-100">
      <div class="container">
        <ToastContainer/>
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
              {error && <div style={{ color: 'red' }}>{error}</div>}
                <div class="row gy-3 gy-md-4 overflow-hidden">
                  <div class="col-12">
                    <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <i className='fa fa-envelope-o'></i>
                      </span>
                      <input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='Email address' required />
                    </div>
                  </div>
                  <div class="col-12">
                    <label for="password" class="form-label">Password <span class="text-danger">*</span></label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <i className='fa fa-key'></i>
                      </span>
                      <input type="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder='Password' required />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-grid">
                      <button class="btn btn-primary btn-lg" type="submit">Log In</button>
                    </div>
                  </div>
                  <Link to='/reset-password' className="link-primary text-decoration-none">Forgot Password</Link>
                </div>
              </form>
              <div class="row">
                <div class="col-md-12">
                  <hr class="mt-5 mb-4 border-secondary-subtle" />
                  <div class="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center">
                    <h6>New member ? Click here 
                        <NavLink  to='/new-account' className="link-primary text-decoration-none"> create new account</NavLink>
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