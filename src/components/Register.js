import React from 'react'
import { NavLink } from 'react-router-dom'

export const Register = () => {
  return (
    <div class="bg-light py-md-5 vh-100">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
            <div class="bg-white p-4 p-md-5 rounded shadow-sm ">
              <div class="row">
                <div class="col-12">
                  <div class="text-center mb-5">
                    <h3>MASS MEDIA<span style={{ color: '#19B3D3' }}> HUB</span></h3>
                  </div>
                </div>
              </div>
              <form action="#!">
              <div className="row gy-3 gy-md-4 overflow-hidden">
                <div className='mt-5'>
                    <div className='row'>

                        <div className='col-6'>
                            <p  className="mb-1 form-label">Fullname</p>
                            <div className="input-group mb-4">
                                <input type="text" className="form-control" placeholder="Fullname" />
                            </div>
                        </div>

                        <div className='col-6'>
                            <p className='mb-1 form-label'>Email</p>
                            <div className='input-group mb-4'>
                                <input type='email' className='form-control' placeholder='Email' />
                            </div>
                        </div>

                    </div>

                    <div className='row'>
                        <div className='col-6'>
                            <p className='mb-1 form-label'>Address</p>
                            <div className='input-group mb-4'>
                                <input type='text' className='form-control' placeholder='Address' />
                            </div>
                        </div>

                        <div className='col-6'>
                            <p className='mb-1 form-label'>Phone</p>
                            <div className='input-group mb-4'>
                                <input type='number' className='form-control' placeholder='Phonenumber'/>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-6'>
                            <p className='mb-1 form-label'>Password</p>
                            <div className='input-group mb-4'>
                                <input type='password' className='form-control' placeholder='Password' />
                            </div>
                        </div>

                        <div className='col-6'>
                          <p className='mb-1 form-label'>Confirm Password</p>
                          <div className='input-group mb-4'>
                            <input type='password' className='form-control' placeholder='Confirm Password' />
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
