import React from 'react'
import { Navigation } from '../../navigation/Navigation'
import { NavLink,Outlet } from 'react-router-dom'
export const Customer = () => {
  return (
    <><Navigation />
    <div className='main mt-5'>
        <div className='content'>
            <div className='container-fluid mt-5'>
                <div className='content-header mb-5'>
                  <nav aria-label='breadcrumb'>
                    <ol className='breadcrumb'>

                        <li className='breadcrumb-iterm'>
                            <i className='fa fa-home'></i> Home /
                        </li>

                        <li className='breadcrumb-iterm active' aria-current="page">
                          <NavLink to='/manage-customer' className="head-link"> Manage-customer</NavLink>
                        </li>

                    </ol>
                   </nav>

                </div>
                  <div className="vh-70 d-flex justify-content-center align-items-center">
                      <div className='container-fluid'>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-12 col-md-12 col-lg-12 col-sm-12'>
                                <div className='border border-3 border-info'></div>
                                <div className='card bg-white shadow-lg'>
                                    <div className='card-body p-5'>
                                        
                                        <Outlet />

                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
