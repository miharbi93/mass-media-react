import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const EditService = () => {

    const navigate = useNavigate();

    const {serviceId} = useParams();
  return (
    <>
    <h5 className='fw-bold mb-5 text-uppercase'>Update Service {serviceId}</h5>
    {/* <p className='mb-5'>Fill all required information</p> */}
    <form>
    <div className='row'>
        <div className='row mb-4'>
            <div className='col-md-6'>
                <p className='form-label'>Service Name</p>
                <div className='input-group'>
                    <input type='text' className='form-control' placeholder='Service Name' />
                </div>
            </div>

            <div className='col-md-6'>
                <p className='form-label'>Service Description</p>
                <div className='input-group'>
                    <input type='text' className='form-control' placeholder='Service Description' />
                </div>
            </div> 
        </div>

        <div className='row mb-4 mt-5'>
            <div className='col-md-4'>
                <p className='form-label'>Service Price</p>
                <div className='input-group'>
                    <input type='number' className='form-control' placeholder='Service Price' />
                </div>
            </div>
        </div>

        <div className='row mt-5 mb-5'>
            <div className='col-4'>
                  {/* <div className='input-group'> */}
                <button type='button' className='btn btn-primary w-50'>Update</button>
                  {/* </div> */}
            </div>

            <div className='col-4'>
                  {/* <div className='input-group'> */}
                <button type='button' onClick={() => navigate(-1)} className='btn btn-danger w-50 float-start'>Back</button>
                  {/* </div> */}
            </div>

        </div>
    </div>
    </form>
    </>
  )
}
