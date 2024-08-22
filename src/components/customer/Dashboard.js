import React, { useEffect, useState } from 'react';
import { Navigation } from '../navigation/Navigation';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export const CustomerDashboard = () => {
  const [data, setData] = useState([]);

  const [showChannel, setShowChannel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalService, setTotalService] = useState(0);

  const [service,setService] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/channel/all')
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      });
  }, []);

  useEffect(()=>{
    axios.get('http://localhost:9000/api/services/all')
    .then((response)=>{
      console.log(response.data);
      setService(response.data)
      
    })
  },[]);


  // {data.filter((media) => media.mediaId === item.mediaId).length}
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
                    <i className='fa fa-home'></i> Home 
                  </li>
                  <li className='breadcrumb-item active' aria-current="page">
                    <NavLink to='/dashboard' className="head-link">Dashboard</NavLink>
                  </li>
                </ol>
              </nav>
            </div>
          </div>


          <section className='py-3 container shadow bg'>

            
            <div className='row vw-50'>

              
              <h3 className='mt-3 mb-5'>
                <i className='fa fa-get-pocket ms-2'> </i>
                Available Mass Media Channel
              </h3>

              <hr className='media-line' />

              {data.map((item, index) => (
                <div className='col-11 col-md-6 col-lg-4 mx-0 mb-5' key={index}>
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
                            <span className="number3 text-success">
            
                            {service.filter((mediaChannel) => mediaChannel.mediaChannel.mediaId === item.mediaId).length}

                            </span>
                          </div>
                        </div>

                        <div className="button ms-3 mt-4 mb-4 d-flex mt-3 flex-row align-items-center">
                          <button className="btn btn-sm btn-outline-primary w-50">View More</button>
                          {item.status === 'Closed' ? (
                            <button className="btn btn-sm btn-light w-50 ms-2" disabled>Closed</button>
                          ) : (
                            <NavLink 
                              to={`/apply/${item.mediaId}`} 
                              className="btn btn-sm btn-primary w-50 ms-2"
                            >
                              Apply
                            </NavLink>
                          )}
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
  );
};
