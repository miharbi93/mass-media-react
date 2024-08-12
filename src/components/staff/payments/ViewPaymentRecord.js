import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const ViewPaymentRecord = () => {
    const [payment, setPayments] = useState([]);

    const mediaId = parseInt(localStorage.getItem('mediaId'));

    useEffect(()=>{
        axios.get('http://localhost:9000/api/payment/all')
        .then((response)=>{
        const filteredPayments = response.data.filter(payment => payment.application.mediaService.mediaChannel.mediaId === mediaId);

            setPayments(filteredPayments);
        })
    })
  return (
    <>
    <nav>
        <button type='button' className='btn btn-outline-success mb-4'>
            Total Payment Record
            <span className='badge bg-dark ms-1'>{0}</span>
        </button>
    </nav>
    {payment.length === 0 ? 
    
    <div class="alert alert-primary  alert-dismissible fade show">
        <strong>
            <i className='fa fa-warning'> </i> Warning!</strong> 
            <h6 className='mt-4'>No Payment Record Found.</h6>
    </div>: (

    <div className='table table-responsive mt-2'>
        <table className='table table-hover table-bordered'>
            <thead>
                <tr>
                    <th className='text-center'>SN</th>
                    <th className='text-center'>Service Name</th>
                    <th className='text-center'>Controll Number</th>
                    <th className='text-center'>Amount</th>
                    <th className='text-center'>Paid Amount</th>
                    <th className='text-center'>Remain Amount</th>
                    <th className='text-center'>Pay Date</th>
                    <th className='text-center'>Payment Status</th>
                    <th className='text-center'>Action</th>
                </tr>
            </thead>
            <tbody>
                {payment.map((item,index)=>(
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td className='text-center'>{item.application.mediaService.serviceName}</td>
                    <td className='text-center'>{item.controlNumber}</td>
                    <td className='text-center'>{item.application.amount}</td>
                    <td className='text-center'>{item.paidAmount}</td>
                    <td className='text-center'>{item.application.amount - item.paidAmount}</td>
                    <td className='text-center'>{item.paymentDate}</td>
                    <td className='text-center'>
                    {item.application.amount - item.paidAmount === 0 ? (
                        <span style={{ color: 'green', fontWeight: "bold" }}>Complete</span>
                      ) : (
                        <span style={{ color: 'red', fontWeight: "bold" }}>Incomplete</span>
                      )}
                    </td>
                    <td>
                        <button className='btn btn-outline-danger'><i className='fa fa-trash'> </i> delete</button>
                    </td>
                </tr>
                ))}

            </tbody>
        </table>
    </div>
    )}
    </>

    )
    }
            
