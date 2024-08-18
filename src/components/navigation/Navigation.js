import React from 'react'
import { Header } from './Header'
import logo from '../../circled-user-icon-.png';
import logo2 from '../../pro-1.jpeg';
import { NavLink } from 'react-router-dom';
import links from './Links';

export const Navigation = ({userRole = localStorage.getItem('userRole')}) => {

    const name = localStorage.getItem('name')

    const image = localStorage.getItem('image')


  return (

    <>
    <Header />
    <nav className='sidebar'>
        <div className='menu-content'>
            <div className='profile_info'>
                {userRole === 'Admin' ?(
                    <img src={logo2} className='profile_image' />
                ):(
                    <img src={`data:image/png;base64,${image}`} className='profile_image' />
                )}
                {/* <img src={`data:image/png;base64,${image}`} className='profile_image' /> */}
                {/* <img src={logo}  className='profile_image'/> */}
                <h4 style={{ "color": "white" }}>{name}</h4>
            </div>

            <hr className='line-after-profile' />

            <ul className='menu-items'>

                {links[userRole].map((link, index) => (
                    <li key={index} className='items'>
                        <NavLink to={link.path}>
                            <i className={`fa fa-${link.icon}`}> </i> {link.label}
                        </NavLink>
                    </li>

                ))}
            </ul>
        </div>

    </nav>
    </>

  )
}
