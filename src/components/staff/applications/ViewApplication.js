import React from 'react'
import { Link } from 'react-router-dom'
export const ViewApplications = () => {

  return (
    <>
    <h5 className='fw-bold mb-5 text-uppercase'>Customer Applications List</h5>
    <nav>
        <button className='btn btn-primary mb-4'>Approved List</button>
        <button type='button' className='btn btn-success ms-5 mb-4'>
            Applications
            <span className='badge bg-primary'>45</span>
        </button>

    </nav>
    <div className='table-responsive'>
        <table className='table table table-hover table-bordered'>
            <thead>
                <tr>
                    <th>Application ID</th>
                    <th>Customer Name</th>
                    <th>Customer Phone</th>
                    <th>Service Name</th>
                    <th>Service Duration</th>
                    <th>Amount</th>
                    <th>Paid Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>01</td>
                    <td>Ibrahim Juma</td>
                    <td>0775296653</td>
                    <td>Business Advertising</td>
                    <td>7 Days</td>
                    <td>50,000</td>
                    <td>0</td>
                    <td>Pending</td>
                    <td>
                        <button className='btn btn-outline-info'><i className='fa fa-eye'></i></button>
                        <button className='btn btn-outline-success ms-2'><i className='fa fa-edit'></i></button>
                        <button className='btn btn-outline-danger ms-2'><i className='fa fa-trash'></i></button>
                        <button className='btn btn-outline-primary ms-2'><i className='fa fa-download'></i></button>
                    </td>
                </tr>
            </tbody>

        </table>
    </div>
    </>
  )
}
