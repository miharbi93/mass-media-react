import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, ToastPosition } from 'react-toastify';
export const EditChannel = () => {
  
  const { mediaId } = useParams();

  const navigate = useNavigate();

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
          autoClose: 1500,
        });

        setTimeout(()=>{
          navigate(-1);
        }, 1500);
        // navigate(-1); // navigate to channels page after successful submission
      })
     .catch(error => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer/>
      <h5 className='fw-bold mb-2 text-uppercase'>Update Media Channel {mediaId} </h5>
      <p className='mb-5'>Fill all required information</p>

      <div className='row'>
        <div className='row mb-4'>

          <div className='col-md-4'>
            <p className='form-label'>Media Name</p>
            <input
              type='text'
              className='form-control'
              placeholder='username'
              value={mediaName}
              required
              onChange={(event) => setMediaName(event.target.value)}
            />
          </div>

          <div className='col-md-4'>
            <p className='form-label'>Media Email</p>
            <input
              type='text'
              className='form-control'
              placeholder='email'
              value={mediaEmail}
              required
              onChange={(event) => setMediaEmail(event.target.value)}
            />
          </div>


          <div className='col-md-4'>
            <p className='form-label'>Select Mass Media Type</p>
            <select
              className='form-select'
              value={mediaType}
              required
              onChange={(event) => setMediaType(event.target.value)}
            >
              <option>None</option>
              <option>Radio</option>
              <option>Television</option>
              <option>Newspaper</option>
            </select>
          </div>

        </div>

        <div className='row mb-4'>

          <div className='col-md-6'>
            <p className='form-label'>Media WebUrl</p>
            <input
              type='text'
              className='form-control'
              placeholder='webUrl'
              value={mediaWebUrl}
              required
              onChange={(event) => setMediaWebUrl(event.target.value)}
            />
          </div>

          <div className='col-md-6'>
            <p className='form-label'>Media Description</p>
            <input
              type='text'
              className='form-control'
              placeholder='description'
              value={mediaDescription}
              required
              onChange={(event) => setMediaDescription(event.target.value)}
            />
          </div>

        </div>

        <div className='row mb-4'>
          

          <div className='col-md-6'>
            <p className='form-label'>Media Image</p>
            <input type='file' className='form-control' onChange={(event) => setMediaImage(event.target.files[0])} />
          </div>

          <div className='col-md-6'>
            <p className='form-label'>Status</p>
            <select className='form-select'
                value={mediaStatus} 
                required
                onChange={(event) => setMediaStatus(event.target.value)}>
              <option>Open</option>
              <option>Closed</option>
            </select>
          </div>
        </div>

        <div className='row mb-4 mt-4'>
          <div className='col-md-6'>
           <button type='submit' className='btn btn-primary w-50'>Save</button>
          </div>

          <div className='col-md-6'>
            <button type='button' onClick={() => navigate(-1)} className='btn btn-danger w-50'>Back</button>

          </div>
        </div>

      </div>
    </form>
  )
}