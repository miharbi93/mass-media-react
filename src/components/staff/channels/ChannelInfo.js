import React, { useEffect, useState } from 'react'
import logo from '../../../images (52).png'
import logo2 from '../../../download.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, ToastPosition } from 'react-toastify';


export const ChannelInfo = () => {

    const navigate = useNavigate();

    

    
    const mediaId = localStorage.getItem('mediaId');
    const imageLogo = localStorage.getItem('image')


    // console.log(userLinks);
    // console.log(userRole);


    // const mediaIds = mediaId;
    // const id = 1;
    
    const [channel, setChannel] = useState(null);


    const [mediaName, setMediaName] = useState('');
    const [mediaType, setMediaType] = useState('');
    const [mediaEmail, setMediaEmail] = useState('');
    const [mediaWebUrl, setMediaWebUrl] = useState('');
    const [mediaImage, setMediaImage] = useState(null);
    const [mediaStatus, setMediaStatus] = useState('');
    const [mediaDescription, setMediaDescription] = useState('');
  
    const fetchChannelData = async (mediaId) => {
      try {
        const response = await fetch(`http://localhost:9000/api/channel/byId/${mediaId}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching channel data:', error);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        const channelData = await fetchChannelData(mediaId);
        if (channelData) {
          setMediaName(channelData.mediaName);
          setMediaType(channelData.mediaType);
          setMediaEmail(channelData.mediaEmail);
          setMediaWebUrl(channelData.mediaWebUrl);
          setMediaStatus(channelData.status);
          setMediaDescription(channelData.mediaDescription);
        }
      };
      fetchData();
    }, [mediaId]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append('mediaName', mediaName);
      formData.append('mediaType', mediaType);
      formData.append('mediaEmail', mediaEmail);
      formData.append('mediaWebUrl', mediaWebUrl);
      formData.append('mediaDescription', mediaDescription);
      formData.append('status', mediaStatus);
      formData.append('image', mediaImage);
  
      axios.put(`http://localhost:9000/api/channel/update/${mediaId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
       .then(response => {
          console.log(response);
          toast.success("Updated successfully", {
            className: "toast-success-inside",
            position: "top-right", // or "top-left", "bottom-right", "bottom-left"
            autoClose: 3000,
          });
  
        //   setTimeout(()=>{
        //     // navigate(-1);
        //   }, 1500);
          // navigate(-1); // navigate to channels page after successful submission
        })
       .catch(error => {
          console.error(error);
        });
    };
  

    
    return (
        <>
            <h5 className='fw-bold mb-2 text-uppercase'>Media Channel Information</h5>
            <p className='mb-2'>You can update the Channel Information</p>
            <div className='row'>
            <ToastContainer/>

                <form onSubmit={handleSubmit}>
                    <div className='row mb-1'>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <div className='channel_info'>
                                <img src={`data:image/png;base64,${imageLogo}`} 
                                    alt={mediaName} className='profile_images'
                                     />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-md-4'>
                            <div className='form-group'>
                                <p className='form-label'>Channel Name</p>
                                <input type='text' 
                                    className='form-control fw-bold text-success' 
                                    value={mediaName}
                                    onChange={(event) => setMediaName(event.target.value)} />

                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='form-group'>
                                <p className='form-label'>Channel Email</p>
                                <input type='text' 
                                className='form-control fw-bold text-success' 
                                value={mediaEmail} />
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='form-group'>
                                <p className='form-label'>Channel Website Url</p>
                                <input type='text' 
                                    className=' form-control fw-bold text-success' 
                                    value={mediaWebUrl} />
                            </div>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <p className='form-label'>Channel Description</p>
                                <input type='text' 
                                    className='form-control fw-bold text-success' 
                                    value={mediaDescription} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <p className='form-label'>Select Channel Logo</p>
                                <input type='file'  
                                    className='form-control fw-bold text-dark'
                                    onChange={(event) => setMediaImage(event.target.files[0])} />
                            </div>
                        </div>
                    </div>

                    <div className='row mb-5'>

                        <div className='col-md-4'>
                            <div className='form-group'>
                                <p className='form-label'>Media Channel Status</p>
                                <select className='form-select'
                                    value={mediaStatus} 
                                    onChange={(event) => setMediaStatus(event.target.value)}>
                                    <option>Open</option>
                                    <option>Closed</option>
                            </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <button type='submit' className='btn btn-primary w-50'>Update Info</button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </>

    )
}
