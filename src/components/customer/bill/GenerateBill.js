import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, ToastPosition } from 'react-toastify';

export const GenerateBill = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplicationId, setSelectedApplicationId] = useState('');
  const [controlNumber, setControlNumber] = useState('');
  const [message, setMessage] = useState('');
  const [payments, setPayments] = useState([]);
  const [generatedControlNumbers, setGeneratedControlNumbers] = useState({});
  const [loading, setLoading] = useState(true);
  const [listPayment, setListPayment] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const userID = parseInt(localStorage.getItem('userId'));

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/applications/customers/${userID}/applications`);
      setApplications(response.data);
      console.log('Applications fetched successfully');
    } catch (error) {
      console.error('Error fetching applications:', error);
      setMessage('Error fetching applications');
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/payment/all');
      const filteredPayments = response.data.filter(payment => payment.applicationId === applications.applicationId);
      setPayments(response.data);
      setPayments(filteredPayments)
      console.log('Payments fetched successfully');
    } catch (error) {
      console.error('Error fetching payments:', error);
      setMessage('Error fetching payments');
    }
  };

  const fetchPaymentsForSpecificCustomer = async() =>{
    try{
      const response = await axios.get('http://localhost:9000/api/payment/payments');
      const filterPay = response.data.filter(pay => pay.userId === userID);
      setListPayment(filterPay);
      console.log("Hi ");
      console.log(filterPay);
    }catch(error){
      console.error("Does not fetch payment", error);
    }
  }

  useEffect(() => {
    fetchApplications();
    fetchPayments();
    fetchPaymentsForSpecificCustomer();

    setTimeout(() => {
      setShowTable(true);
      setLoading(false);
    }, 900); // 30 seconds
  }, []);

  const handleGenerateControlNumber = () => {
    if (selectedApplicationId) {
      axios.get(`http://localhost:9000/api/payment/control-number/${selectedApplicationId}`)
        .then(response => {
          setControlNumber(response.data);
          setGeneratedControlNumbers((prevGeneratedControlNumbers) => ({
            ...prevGeneratedControlNumbers,
            [selectedApplicationId]: true,
          }));

          toast.success("Generated successfully", {
            className: "toast-success-inside",
            position: "top-right", // or "top-left", "bottom-right", "bottom-left"
            autoClose: 5000,
          
          });
          fetchPayments();
          fetchPaymentsForSpecificCustomer();


        })
        .catch(error => {
          console.error('Error generating control number:', error);
          // setMessage('Error generating control number');
          toast.success("Generated successfully", {
            className: "toast-error-inside",
            position: "top-right", // or "top-left", "bottom-right", "bottom-left"
            autoClose: 5000,
          
          });
        });
    } else {
      setMessage('Please select an application ID');
    }
  };

  const hasGeneratedControlNumber = (applicationId) => {
    return payments.some((payment) => payment.application.applicationId === applicationId);
  };

  const handleDelete = (paymentId) =>{
    if(window.confirm("Are you sure you want to delete")){
        axios.delete(`http://localhost:9000/api/payment/delete/{paymentId}?paymentId=${paymentId}`)
        .then(()=>{
            // setData(data.filter (item => item.userId  !== userId));
            toast.success("Deleted successfully", {
                className: "toast-success-inside",
                position: "top-right", // or "top-left", "bottom-right", "bottom-left"
                autoClose: 5000,
              
              });

          fetchPayments();

        })
        .catch(error => console.error("Error",error));

}

}

  return (
    <div className="row">
        <ToastContainer/>
      <h3 className="mb-4">Generate Bill</h3>
      
      <div className='col-md-3'>
        <div className="form-group">
          <label className='form-label'>Select Application ID</label>
          <select
            value={selectedApplicationId}
            onChange={(e) => setSelectedApplicationId(e.target.value)}
            className="form-control mt-3 mb-5"
            >
              <option value="">Select an application ID</option>
              {applications.filter((application) => !hasGeneratedControlNumber(application.applicationId)).map((application) => (
                <option key={application.applicationId} value={application.applicationId}>
                  {application.applicationId}
                </option>
              ))}
            </select>
          </div>
        </div>
  
        <div className='col-md-4 mt-5'>
          <button
            onClick={handleGenerateControlNumber}
            className="btn btn-outline-primary"
          >
            Generate Control Number
          </button>
        </div>
  
        {/* <p className="lead mb-4">Control Number: {controlNumber}</p> */}
        {controlNumber && (
          <p className="lead mb-4">Control Number: {controlNumber}</p>
        )}
        {/* <p className="text-muted">{message}</p> */}
  
        {loading ? (
          <strong>
            <i className='fa fa-spinner fa-spin'> </i> Loading...
          </strong>
        ) : (
          <div className='row'>
            <div className='table table-responsive mt-2'>
              {showTable && (
                <div>
                  {listPayment.length > 0 ? (
                    <table className='table table-hover table-bordered'>
                      <thead>
                        <tr>
                          <th className='text-center p-2'>SN</th>
                          <th className='text-center'>Payment ID</th>
                          <th className='text-center'>Control Number</th>
                          <th className='text-center'>Amount</th>
                          <th className='text-center'>Paid Amount</th>
                          <th className='text-center'>Payment Date</th>
                          <th className='text-center'>Payment Status</th>
                          <th className='text-center'>Action</th>
                        </tr>
                      </thead>
  
                      <tbody>
                        {listPayment.map((payment, index) => (
                          <tr key={payment.paymentId}>
                            <td>{index + 1}</td>
                            <td>{payment.paymentId}</td>
                            <td className='text-center'>{payment.controlNumber}</td>
                            <td className='text-center'>{payment.amount}</td>
                            <td className='text-center'>{payment.paidAmount}</td>
                            <td className='text-center'>{payment.paymentDate}</td>
                            <td className='text-center'>
                              {payment.amount - payment.paidAmount === 0 ? (
                                <span style={{ color: 'green', fontWeight: "bold" }}>Complete</span>
                              ) : (
                                <span style={{ color: 'red', fontWeight: "bold" }}>Incomplete</span>
                              )}
                            </td>
                            <td>
                              <Link to={`view-bill/${payment.applicationId}`} className='btn btn-outline-primary'> <i className='fa fa-eye'> </i> View bill</Link>
                              <button
                              onClick={() => handleDelete(payment.paymentId) }
                              className='btn btn-outline-danger ms-3'><i className='fa fa-trash'> </i> delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="alert alert-primary" role="alert">
                      No data found!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default GenerateBill;