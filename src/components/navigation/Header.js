import React from 'react'
import { NavLink } from 'react-router-dom'

import logo3 from '../../3.png';


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
        <img src={logo3}  style={{width:'100%'}}/>
    </nav>
    
    </>
  )
}
