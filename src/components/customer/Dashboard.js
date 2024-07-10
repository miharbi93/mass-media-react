import React, { useEffect, useState } from 'react'
import { Navigation } from '../navigation/Navigation'
import { NavLink } from 'react-router-dom'
import Logo from '../../download.png'
import logo2 from '../../ufm radio.jpeg'
import logo3 from '../../azam tv.jpeg'
import logo4 from '../../channel 10.jpeg'
import logo5 from '../../wasafi tv.jpeg'
import axios from 'axios'
export const CustomerDashboard = () => {

    const [data, setData] = useState([]);

   useEffect(()=>{
    axios.get('http://localhost:9000/api/channel/all')
    .then((response)=>{
        console.log(response.data);
        setData(response.data);
    })
   })



    return (
        <>
            <Navigation />
            <div className='main mt-5'>
                <div className='content'>
                    <div className='container-fluid mt-5'>
                        <div className='content-header mb-5'>
                            <nav aria-label='breadcrumb'>
                                <ol className='breadcrumb'>

                                    <li className='breadcrumb-item'>
                                        <i className='fa fa-home'></i> Home /
                                    </li>

                                    <li className='breadcrumb-item active' aria-current="page">
                                        <NavLink to='/dashboard' className="head-link"> Dashboard</NavLink>
                                    </li>

                                </ol>
                            </nav>

                        </div>
                    </div>
                


                <section className='py-3 container shadow bg'>
                    <div className='row  vw-50'>
                        <h3 className='mt-3 mb-5'>
                            <i className='fa fa-get-pocket ms-2'> </i>
                            Available Mass Media 
                        </h3>

                        <hr className='media-line'/>

                        {/* <div className='row'>
                            <div className='col-md-6 mb-4'>
                                <label className='form-label'>Search</label>
                                <input type='text' className='form-control'/>
                            </div>
                        </div> */}

                        {data.map((item , index)=>(

                            <div className='col-11 col-md-6 col-lg-4 mx-0  mb-5'>
                            <div className='card p-2 vw-50 shadow'>
                                <div className="d-flex align-items-center">
                                    <div className="image">
                                        <img src={`data:image/png;base64,${item.image}`} className="rounded" width="155" />
                                    </div>

                                    <div className="ml-3 w-100">
                                        <h4 className="mb-0 mt-2 ms-3">{item.mediaName}</h4>
                                        <span className='ms-3'>{item.mediaType}</span>
                                        <p className='ms-3 status'>{item.status}</p>

                                        <div className="p-1 mt-2 bg-light ms-2 d-flex justify-content-between rounded text-white stats">

                                            <div className="d-flex flex-column">
                                                <span className="rating text-primary">Available Service</span>
                                                <span className="number3 text-success">8.9</span>
                                            </div>
                                        </div>

                                        <div className="button ms-3 mt-4 mb-4 d-flex  mt-3 flex-row align-items-center">
                                            <button className="btn btn-sm btn-outline-primary w-50">View More</button>
                                            <button className="btn btn-sm btn-primary ms-1 w-50 ml-2">Apply</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        ))}
                        


                        
                    </div>
                </section>

            </div>
            </div>
        </>
    )
}