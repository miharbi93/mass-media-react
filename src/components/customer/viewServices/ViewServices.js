import React, { useEffect, useState } from 'react'
import { Navigation } from '../../navigation/Navigation'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

export const ViewServices = () => {

  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(false);

  const { mediaId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/services/mediaId/${mediaId}`);
        setData(response.data);
        console.log(response.data);
        if (response.data.length === 0) {
          setNoData(true);
        }
      } catch (error) {
        console.error(error);
        console.log(error);
        setNoData(true);
      }
    };
    fetchData();
  }, [mediaId]);

  return (
    <>
      <Navigation />
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
                    <NavLink to='/view-services' className="head-link"> view services</NavLink>
                  </li>

                </ol>
              </nav>

            </div>
            <div className="vh-70 d-flex justify-content-center align-items-center">
              <div className='container-fluid'>
                <div className='row d-flex justify-content-center'>
                  <div className='col-12 col-md-12 col-lg-12 col-sm-12'>
                    <div className='border border-3 border-primary'></div>
                    <div className='card bg-white shadow-lg'>
                      <div className='card-body p-5'>

                        {/* <Outlet /> */}

                        
                        

                        <div className='container-fluid'>
                          {noData ? (
                            <div className="alert alert-primary" role="alert">
                              No data found!
                            </div>
                          ) : (
                            <>
                              <h4 className='mb-5' style={{fontWeight:'bold'}}>MEDIA SERVICE AVAILABLE</h4>
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th scope="col" className='text-center'>SN</th>
                                    <th scope="col" className='text-center'>Service Name</th>
                                    <th scope="col" className='text-center'>Service Description</th>
                                    <th scope="col" className='text-center'>Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.map((item, index)=>(
                                      <tr key={item.serviceId}>
                                      <th className='text-center'>{index + 1}</th>
                                      <td>{item.serviceName}</td>
                                      <td>{item.serviceDescription}</td>
                                      <td  className='text-center'>{item.servicePrice}</td>
                                    </tr>
                                  ))}
   
                                </tbody>
                              </table>
                              <button onClick={() => navigate(-1)}  className='btn btn-danger mt-5 mb-5'>Back</button>
                            </>
                          )}
                        </div>
                        
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