import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const ApplicationForm = () => {
  const [customerId, setCustomerId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [advertiseDocument, setAdvertiseDocument] = useState(null);
  const [uthibitishoDocument, setUthibitishoDocument] = useState(null);
  const [mediaService, setMediaService] = useState([]);
  const navigate = useNavigate();
  const { mediaId } = useParams();

  const userId = parseInt(localStorage.getItem('userId'));

  useEffect(() => {
    axios.get(`http://localhost:9000/api/services/mediaId/${mediaId}`)
      .then((response) => {
        console.log(response.data);
        setMediaService(response.data);
      })
      .catch(error => {
        console.error('Error fetching media services:', error);
      });
  }, [mediaId]);

  const handleFileChange = (setter) => (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`Selected file: ${file.name}`);
    } else {
      console.log('No file selected');
    }
    setter(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('customerId', userId);
    formData.append('serviceId', serviceId);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    if (advertiseDocument) {
      formData.append('advertiseDocument', advertiseDocument);
    } else {
      console.error('advertiseDocument is null');
    }
    if (uthibitishoDocument) {
      formData.append('uthibitishoDocument', uthibitishoDocument);
    } else {
      console.error('uthibitishoDocument is null');
    }

    try {
      const response = await axios.post('http://localhost:9000/api/applications/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert("Successful");
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("There was an error submitting the form");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className='fw-bold mb-2 text-uppercase'>Application Form Media ID = {mediaId}</h5>
      <p className='mb-5'>Fill all required information</p>

      <div className='row'>
        <div className='row mb-5'>
          <div className='col-md-6'>
            <label className='form-label' htmlFor="customerId">Customer ID:</label>
            <input className='form-control'
              type="text"
              id="customerId"
              value={userId} 
              onChange={(e) => setCustomerId(e.target.value)}
            />
          </div>
          <div className='col-md-6'>
            <label className='form-label' htmlFor="serviceId">Select Service</label>
            <select className='form-select' value={serviceId} onChange={(event) => setServiceId(event.target.value)}>
              <option value="">None</option>
              {mediaService.map((service) => (
                <option key={service.serviceId} value={service.serviceId}>
                  {service.serviceName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='row mb-5'>
          <div className='col-md-6'>
            <label className='form-label' htmlFor="startDate">Start Date:</label>
            <input className='form-control'
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className='col-md-6'>
            <label className='form-label' htmlFor="endDate">End Date:</label>
            <input className='form-control'
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-md-6'>
            <label className='form-label' htmlFor="advertiseDocument">Advertise Document:</label>
            <input className='form-control'
              type="file"
              id="advertiseDocument"
              onChange={(e) => {
                console.log(`Advertise Document Change: ${e.target.files.length}`);
                handleFileChange(setAdvertiseDocument)(e);
              }}
            />
          </div>
          <div className='col-md-6'>
            <label className='form-label' htmlFor="uthibitishoDocument">Uthibitisho Document:</label>
            <input className='form-control'
              type="file"
              id="uthibitishoDocument"
              onChange={(e) => {
                console.log(`Uthibitisho Document Change: ${e.target.files.length}`);
                handleFileChange(setUthibitishoDocument)(e);
              }}
            />
          </div>
        </div>
        <div className='row mt-5 mb-3'>
          <div className='col-md-6'>
            <button className='btn btn-primary w-50' type="submit">Submit</button>
          </div>
          <div className='col-md-6'>
            <button className='btn btn-danger w-50' onClick={() => navigate(-1)} type="button">Back</button>
          </div>
        </div>
      </div>
    </form>
  );
};
