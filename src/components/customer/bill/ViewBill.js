import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

export const ViewBill = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { applicationId } = useParams();
  const appId = parseInt(applicationId);

  useEffect(() => {
    axios.get(`http://localhost:9000/api/payment/${appId}`)
      .then(response => {
        setPaymentData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [appId]);

  const printBill = () => {
    const input = document.getElementById('invoice');
    
    // Apply grayscale filter
    input.style.filter = 'grayscale(100%)';

    html2canvas(input, { scale: 2 })
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Bill_${appId}.pdf`);
        
        // Revert grayscale filter
        input.style.filter = '';
      })
      .catch(error => {
        console.error('Error generating PDF', error);
        
        // Revert filter in case of error
        input.style.filter = '';
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containers" style={{ padding: 20, maxWidth: 1500, maxHeight: 800, margin: '10px auto' }}>
      <button onClick={() => navigate(-1)} className="btn btn-danger float-right mt-4 ms-4">
        <i className="fa fa-chevron-circle-left"></i> Back
      </button>
      <div className="invoice" id="invoice" style={{ padding: 20, border: '1px solid #ddd', borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div className="header mb-5">
          <p style={{ fontSize: 25, marginBottom: 10, marginTop: 20, fontWeight: 'bold' }}>
            {paymentData.application.mediaService.mediaChannel.mediaName} Bill Summary Report
          </p>
        </div>
        <div className="bill-details">
          <div className="bill-to">
            <h2 className="invoice-span mb-4" style={{ fontSize: 18, marginBottom: 10 }}>BILL FROM</h2>
            <p className="par">
              <span className="invoice-span">Media Name: </span>
              {paymentData.application.mediaService.mediaChannel.mediaName}
            </p>
            <p className="par">
              <span className="invoice-span">Media Type: </span>
              {paymentData.application.mediaService.mediaChannel.mediaType}
            </p>
            <p className="par">
              <span className="invoice-span">Media Email: </span>
              {paymentData.application.mediaService.mediaChannel.mediaEmail}
            </p>
            <h2 className="invoice-span mt-5">Generated Control Number</h2>
            <p style={{ fontSize: 17 }}>{paymentData.controlNumber}</p>
          </div>
          <div className="bill-number">
            <h2 className="invoice-span mb-4" style={{ fontSize: 18, marginBottom: 10 }}>BILL INFO</h2>
            <p className="par">
              <span className="invoice-span">Bill No </span>#00{paymentData.paymentId}
            </p>
            <p className="par">
              <span className="invoice-span">Bill Date </span>
              {paymentData.paymentDate}
            </p>
          </div>
        </div>
        <div className="items">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ fontSize: 15, padding: 10, borderBottom: '1px solid #ddd' }}>No</th>
                <th style={{ fontSize: 15, padding: 10, borderBottom: '1px solid #ddd' }}>Service Description</th>
                <th style={{ fontSize: 15, padding: 10, borderBottom: '1px solid #ddd' }}>Start Date</th>
                <th style={{ fontSize: 15, padding: 10, borderBottom: '1px solid #ddd' }}>End Date</th>
                <th style={{ fontSize: 15, padding: 10, borderBottom: '1px solid #ddd' }}>Total Days</th>
                <th style={{ fontSize: 15, padding: 10, borderBottom: '1px solid #ddd' }}>Unit Price</th>
                <th style={{ fontSize: 15, padding: 10, borderBottom: '1px solid #ddd' }}>Paid Amount</th>
                <th style={{ fontSize: 15, padding: 10, borderBottom: '1px solid #ddd' }}>Remain Balance</th>
                <th style={{ fontSize: 15, padding: 10, borderBottom: '1px solid #ddd' }}>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontSize: 13, padding: 10, borderBottom: '1px solid #ddd' }}>1</td>
                <td style={{ fontSize: 13, padding: 10, borderBottom: '1px solid #ddd' }}>{paymentData.application.mediaService.serviceName}</td>
                <td style={{ fontSize: 13, padding: 10, borderBottom: '1px solid #ddd' }}>{paymentData.application.startDate}</td>
                <td style={{ fontSize: 13, padding: 10, borderBottom: '1px solid #ddd' }}>{paymentData.application.endDate}</td>
                <td style={{ fontSize: 13, padding: 10, borderBottom: '1px solid #ddd' }}>{paymentData.application.dayPackage.toString()}</td>
                <td style={{ fontSize: 13, padding: 10, borderBottom: '1px solid #ddd' }}> TZS {paymentData.application.mediaService.servicePrice}</td>
                <td style={{ fontSize: 13, padding: 10, borderBottom: '1px solid #ddd' }}> TZS {paymentData.paidAmount}</td>
                <td style={{ fontSize: 13, padding: 10, borderBottom: '1px solid #ddd' }}> TZS {paymentData.application.amount - paymentData.paidAmount}</td>
                <td style={{ fontSize: 13, padding: 10, borderBottom: '1px solid #ddd' }}>
                  {paymentData.application.amount - paymentData.paidAmount === 0 ? (
                    <span style={{ color: 'green' }}>Complete</span>
                  ) : (
                    <span style={{ color: 'red' }}>Incomplete</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="subtotal mb-3 mt-4">
          <p className="par"><span className="invoice-span">Total: </span>{paymentData.application.amount.toString()} TZS</p>
        </div>
      </div>
      <div className="row">
      
      <button  style={{ width: '150px' }} className="btn btn-primary  float-right mt-4 mb-2 ms-3" onClick={printBill}>
            <i className="fa fa-download"></i> Print Bill
      </button>

      

      </div>

    </div>
  );
};

export default ViewBill;
