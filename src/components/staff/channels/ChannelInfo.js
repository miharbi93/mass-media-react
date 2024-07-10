import React, { useEffect, useState } from 'react'
import logo from '../../../images (52).png'
import logo2 from '../../../download.png'
import axios from 'axios';

export const ChannelInfo = () => {

    
    const mediaId = localStorage.getItem('mediaId');

    // console.log(userLinks);
    // console.log(userRole);

    const id = mediaId;
    // const id = 1;
    
    const [channel, setChannel] = useState(null);

    useEffect(() => {

        // const apiEndpoint = `http://localhost:9000/api/channel/byId/${id}`;

        axios.get(`http://localhost:9000/api/channel/byId/${id}`)
        .then(response => {
            setChannel(response.data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!channel) {
        return <div>Loading...</div>;
    }


    
    return (
        <>
            <h5 className='fw-bold mb-2 text-uppercase'>Media Channel Information</h5>
            <p className='mb-2'>You can update the Channel Information</p>
            <div className='row'>
                <form>
                    <div className='row mb-1'>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <div className='channel_info'>
                                <img src={`data:image/png;base64,${channel.image}`} 
                                    alt={channel.channelName} className='profile_images'
                                     />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-md-4'>
                            <div className='form-group'>
                                <p className='form-label'>Channel Name</p>
                                <input type='text' className='form-control fw-bold text-success' value={channel.mediaName} />

                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='form-group'>
                                <p className='form-label'>Channel Email</p>
                                <input type='text' className='form-control fw-bold text-success' value={channel.mediaEmail} />
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='form-group'>
                                <p className='form-label'>Channel Website Url</p>
                                <input type='text' className=' form-control fw-bold text-success' value={channel.mediaWebUrl} />
                            </div>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <p className='form-label'>Channel Description</p>
                                <input type='text' className='form-control fw-bold text-success' value={channel.mediaDescription} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <p className='form-label'>Select Channel Logo</p>
                                <input type='file'  className='form-control fw-bold text-dark' />
                            </div>
                        </div>
                    </div>

                    <div className='row mb-5'>

                        <div className='col-md-4'>
                            <div className='form-group'>
                                <p className='form-label'>Media Channel Status</p>
                                <select className='form-select'>
                                    <option>Open</option>
                                    <option>Closed</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <button className='btn btn-primary w-50'>Update Info</button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </>

    )
}
