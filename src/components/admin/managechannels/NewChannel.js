import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const NewChannel = () => {

    const navigate = useNavigate();

    const [mediaName, setMediaName] = useState('');
    const [mediaType, setMediaType] = useState('');
    const [mediaEmail, setMediaEmail] = useState('');
    const [mediaWebUrl, setMediaWebUrl] = useState('');
    const [mediaImage, setMediaImage] = useState(null);
    const [mediaDescription, setMediaDescription] = useState('');

    const handleSubmit = (event) =>{
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('mediaName', mediaName);
        formData.append('mediaType', mediaType);
        formData.append('mediaEmail', mediaEmail);
        formData.append('mediaWebUrl', mediaWebUrl);
        formData.append('mediaDescription', mediaDescription);
        formData.append('status', 'Open');
        formData.append('image', mediaImage);
    
        axios.post('http://localhost:9000/api/channel/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
           .then(response => {
                console.log(response);
                navigate(-1); // navigate to channels page after successful submission
            })
           .catch(error => {
                console.error(error);
            });
    }

  return (
    <form onSubmit={handleSubmit}>
        <h5 className='fw-bold mb-2 text-uppercase'>Add New Media Channel </h5>
        <p className='mb-5'>Fill all required information</p>
        <div  className='row'>
            <div className='row mb-4'>

                <div className='col-md-6'>
                    <p className='form-label'>Media Name</p>
                    <input type='text' className='form-control' required placeholder='Media Channel' value={mediaName} onChange={(e) => setMediaName(e.target.value)}/>
                </div>

                <div className='col-md-6'>
                    <p className='form-label'>Select Mass Media Type</p>
                    <select className='form-select' required value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
                        <option>None</option>
                        <option>Radio</option>
                        <option>Television</option>
                        <option>Newspaper</option>
                    </select>
                </div>

            </div>

            <div className='row mb-4'>

                <div className='col-md-6'>
                    <p className='form-label'>Media Email</p>
                    <input type='text' className='form-control' required placeholder='Media Email' value={mediaEmail} onChange={(e) => setMediaEmail(e.target.value)}/>
                </div>

                <div className='col-md-6'>
                    <p className='form-label'>Media WebUrl</p>
                    <input type='text' className='form-control' required placeholder='Media WebUrl' value={mediaWebUrl} onChange={(e) => setMediaWebUrl(e.target.value)}/>
                </div>

            </div>

            <div className='row mb-4'>

                <div className='col-md-6'>
                    <p className='form-label'>Media Description</p>
                    <input type='text' className='form-control' required placeholder='Media Description' value={mediaDescription} onChange={(e) => setMediaDescription(e.target.value)}/>
                </div>

                <div className='col-md-6'>
                    <p className='form-label'>Media Image</p>
                    <input type='file' className='form-control' required onChange={(e) => setMediaImage(e.target.files[0])}/>
                </div>
            </div>

            <div className='row mb-4 mt-5'>
                <div className='col-md-6'>
                    <button type='submit' className='btn btn-primary w-50'>Save</button>
                </div>

                <div className='col-md-6'>
                    <button  type='button' onClick={() => navigate(-1)} className='btn btn-danger w-50' >Back</button> 
                </div>
            </div>
            
        </div>
    </form>
  )
}