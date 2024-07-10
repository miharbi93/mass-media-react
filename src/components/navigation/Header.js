import React from 'react'
import { NavLink } from 'react-router-dom'

export const  Header = () => {
  return (
    <>
    <nav className='navbars'>

        <i class="fa-solid  fa fa-bars" id="sidebar-close"></i>
        <div className='right_area'>
            <NavLink to='/' className='btn btn-info logout_btn'>
                <i className='fa fa-sign-out'> </i> Logout</NavLink>
        </div>

    </nav>

    <nav className='logo_sidebar'>
        <h4>Logo sidebar</h4>
    </nav>
    
    </>
  )
}
