import React from 'react'
import { useNavigate } from 'react-router-dom'

export const EditService = () => {

    const navigate = useNavigate();
  return (
    <>
    <h5 className='fw-bold mb-5 text-uppercase'>Update Service</h5>
    {/* <p className='mb-5'>Fill all required information</p> */}
    <form>
    <div className='row'>
        <div className='row mb-4'>
            <div className='col-md-4'>
                <p className='form-label'>Service Name</p>
                <div className='input-group'>
                    <input type='text' className='form-control' placeholder='Service Name' />
                </div>
            </div>

            <div className='col-md-4'>
                <p className='form-label'>Service Description</p>
                <div className='input-group'>
                    <input type='text' className='form-control' placeholder='Service Description' />
                </div>
            </div>

            <div className='col-md-4'>
                <p className='form-label'>Service Price</p>
                <div className='input-group'>
                    <input type='text' className='form-control' placeholder='Service Price' />
                </div>
            </div>
        </div>

        <div className='row mt-3 mb-3'>
            <div className='col-md-4'>
                <p className='form-label'>Service Duration Minutes</p>
                <div className='input-group'>
                    <input type='text' className='form-control' placeholder='Service Duration Minutes' />
                </div>
            </div>

            <div className='col-md-4'>
                <p className='form-label'>Service Duration Day</p>
                <div className='input-group'>
                    <input type='text' className='form-control' placeholder='Service Duration Days' />
                </div>
            </div>

            <div className='col-md-4'>
                <p className='form-label'> Service Status</p>
                <div className='input-group'>
                    <select className='form-select'>
                        <option>Active</option>
                        <option>Disactive</option>
                    </select>
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
