import React, { useState } from 'react'
import { Navigation } from '../../navigation/Navigation'
import axios from 'axios';

export const ApplicationForm = () => {
 

const [customerId, setCustomerId] = useState('');

const [serviceId, setServiceId] = useState('');

const [startDate, setStartDate] = useState('');

const [endDate, setEndDate] = useState('');

const [advertiseDocument, setAdvertiseDocument] = useState(null);

const [uthibitishoDocument, setUthibitishoDocument] = useState(null);


const handleSubmit = async (e) => {

  e.preventDefault();


  const formData = new FormData();

  formData.append('customerId', customerId);

  formData.append('serviceId', serviceId);

  formData.append('startDate', startDate);

  formData.append('endDate', endDate);

  formData.append('advertiseDocument', advertiseDocument);

  formData.append('uthibitishoDocument', uthibitishoDocument);


  try {

    const response = await axios.post('http://localhost:9000/api/applications/apply', formData, {

      headers: {

        'Content-Type': 'multipart/form-data',

      },

    });

    console.log(response.data);

    // Handle success

  } catch (error) {

    console.error(error);

    // Handle error

  }

};


return (

  <form onSubmit={handleSubmit}>

    <div>

      <label htmlFor="customerId">Customer ID:</label>

      <input

        type="text"

        id="customerId"

        value={customerId}

        onChange={(e) => setCustomerId(e.target.value)}

      />

    </div>

    <div>

      <label htmlFor="serviceId">Service ID:</label>

      <input

        type="text"

        id="serviceId"

        value={serviceId}

        onChange={(e) => setServiceId(e.target.value)}

      />

    </div>

    <div>

      <label htmlFor="startDate">Start Date:</label>

      <input

        type="date"

        id="startDate"

        value={startDate}

        onChange={(e) => setStartDate(e.target.value)}

      />

    </div>

    <div>

      <label htmlFor="endDate">End Date:</label>

      <input

        type="date"

        id="endDate"

        value={endDate}

        onChange={(e) => setEndDate(e.target.value)}

      />

    </div>

    <div>

      <label htmlFor="advertiseDocument">Advertise Document:</label>

      <input

        type="file"

        id="advertiseDocument"

        onChange={(e) => setAdvertiseDocument(e.target.files[0])}

      />

    </div>

    <div>

      <label htmlFor="uthibitishoDocument">Uthibitisho Document:</label>

      <input

        type="file"

        id="uthibitishoDocument"

        onChange={(e) => setUthibitishoDocument(e.target.files[0])}

      />

    </div>

    <button type="submit">Submit</button>

  </form>

);

}

