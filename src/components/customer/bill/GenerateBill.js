import React from 'react'

export const GenerateBill = () => {
  return (
    <>
    <h5 className='fw-bold mb-5 text-uppercase'>Generate Bill</h5>
    <div className='table table-responsive mt-2'>
        <table className='table table-hover table-bordered'>
        <thead>
                <tr>
                  <th className='text-center p-2'>ID</th>
                  <th className='text-center'>Media Name</th>
                  <th className='text-center'>Service Name</th>
                  <th className='text-center'>Start Date</th>
                  <th className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>01</td>
                    <td>Channel 10</td>
                    <td>Loss Service</td>
                    <td>15-06-2024</td>
                    <td>
                        <button className='btn btn-outline-danger'>Generate Controll number</button>
                        <button className='btn btn-outline-primary ms-5'>View Bill</button>
                    </td>
                </tr>
              </tbody>
        </table>
    </div>
    </>
  )
}
