import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const ViewPaymentRecord = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);

  const mediaId = parseInt(localStorage.getItem('mediaId'));

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:9000/api/payment/all');
        const filteredPayments = response.data.filter(payment => payment.application.mediaService.mediaChannel.mediaId === mediaId);
        setPayments(filteredPayments);
      } catch (error) {
        setError(error.message);
      } 
    };
    fetchPayments();
    setTimeout(() => {
      setShowTable(true);
      setLoading(false)
    }, 900);
  }, [mediaId]);

  return (
    <>
      <h5 className='fw-bold mb-5 text-uppercase'>View Payment Records</h5>
      {loading ? (
        <strong>
          <i className="fa fa-spinner fa-spin" /> Loading...
        </strong>
      ) : (
        <>
          {showTable && (
            <>
              {payments.length === 0 ? (
                <div className="alert alert-primary alert-dismissible fade show">
                  <strong>
                    <i className="fa fa-warning" /> Warning!
                  </strong>
                  <h6 className="mt-4">No Payment Record Found.</h6>
                </div>
              ) : (
                <>
                  <nav>
                    <button type="button" className="btn btn-outline-success mb-4">
                      Total Payment Record
                      <span className="badge bg-dark ms-1">{payments.length}</span>
                    </button>
                  </nav>
                  <div className="table table-responsive mt-2">
                    <table className="table table-hover table-bordered">
                      <thead>
                        <tr>
                          <th className="text-center">SN</th>
                          <th className="text-center">Service Name</th>
                          <th className="text-center">Controll Number</th>
                          <th className="text-center">Amount</th>
                          <th className="text-center">Paid Amount</th>
                          <th className="text-center">Remain Amount</th>
                          <th className="text-center">Pay Date</th>
                          <th className="text-center">Payment Status</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="text-center">{item.application.mediaService.serviceName}</td>
                            <td className="text-center">{item.controlNumber}</td>
                            <td className="text-center">{item.application.amount}</td>
                            <td className="text-center">{item.paidAmount}</td>
                            <td className="text-center">{item.application.amount - item.paidAmount}</td>
                            <td className="text-center">{item.paymentDate}</td>
                            <td className="text-center">
                              {item.application.amount - item.paidAmount === 0 ? (
                                <span style={{ color: 'green', fontWeight: 'bold' }}>Complete</span>
                              ) : (
                                <span style={{ color: 'red', fontWeight: 'bold' }}>Incomplete</span>
                              )}
                            </td>
                            <td>
                              <button className="btn btn-outline-danger">
                                <i className="fa fa-trash" /> delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};