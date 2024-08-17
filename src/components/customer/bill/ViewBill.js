import React, { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import axios from 'axios';

import Logo from '../../../channel 10.jpeg'
import Logo2 from '../../../azam tv.jpeg'
import { useNavigate, useParams } from 'react-router-dom';

export const ViewBill = () => {

  const navigate = useNavigate();

  const [invoiceData, setInvoiceData] = useState({
    businessName: "Your Business Name",
    streetAddress: "Street Address, City, ST ZIP Code",
    city: "City, ST ZIP Code",
    billTo: "This is a sample text. Insert your desired text here.",
    invoiceNumber: "0001",
    invoiceDate: "January 1, 2017",
    siteAddress: "This is a sample text. Insert your desired text here.",
    items: [
      { description: "Edit text here", quantity: 9, unitPrice: 9.99 },
    ],
  });

  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const {applicationId} = useParams();

  const appId = parseInt(applicationId);

  useEffect(() => {
    axios.get(`http://localhost:9000/api/payment/${appId}`)
    .then(response => {
        console.log(response.data.email);
        setPaymentData(response.data);
        setLoading(false);
      })
    .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const generatePDF = async () => {
    const pdf = new jsPDF();

pdf.setFontSize(24);

pdf.text(invoiceData.businessName, 10, 20);

pdf.setFontSize(14);

pdf.text(invoiceData.streetAddress, 10, 30);

pdf.text(invoiceData.city, 10, 40);


pdf.setFontSize(18);

pdf.text("BILL FROM", 10, 60);

pdf.setFontSize(14);

pdf.text(paymentData.application.mediaService.mediaChannel.mediaName, 10, 70);

pdf.text(paymentData.application.mediaService.mediaChannel.mediaName, 10, 80);


pdf.setFontSize(18);

pdf.text("INVOICE", 150, 60);

pdf.setFontSize(14);

pdf.text(`Invoice #${paymentData.paymentId}`, 150, 70);

pdf.text(paymentData.paymentDate, 150, 80);


pdf.setFontSize(18);

pdf.text("SITE ADDRESS", 10, 100);

pdf.setFontSize(14);

pdf.text(invoiceData.siteAddress, 10, 110);


pdf.setFontSize(12);

pdf.text("No", 10, 130);

pdf.text("Description", 30, 130);

pdf.text("Quantity", 120, 130);

pdf.text("Unit Price", 150, 130);

pdf.text("Line Total", 180, 130);


let y = 140;

pdf.text("1", 10, y);

pdf.text(paymentData.application.mediaService.serviceName, 30, y);

pdf.text(paymentData.application.startDate, 120, y);

pdf.text(paymentData.application.endDate, 150, y);

pdf.text(paymentData.application.dayPackage.toString(), 180, y);

y += 10;


pdf.text("Subtotal", 10, y + 20);

pdf.text(paymentData.application.amount.toString(), 150, y + 20);

pdf.save("invoice.pdf");

};

  return (
    <div className="containers" style={{ padding: 20, maxWidth: 1500, maxHeight:800, margin: '10px auto' }}>
      <div className="invoice" style={{ padding: 20, border: '1px solid #ddd', borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div className="header mb-5">
          {/* <h1 style={{ fontSize: 24, marginBottom: 10 }}>{paymentData.application.mediaService.mediaChannel.mediaName}</h1> */}
          {/* <img className='profile_image' src={Logo}/> */}
          <button onClick={() => navigate(-1)}
            className='btn btn-danger float-right'>
            <i class="fa fa-chevron-circle-left" > </i>
             Back</button>
          <p style={{ fontSize: 25, marginBottom: 10, marginTop:20, fontWeight:"bold" }}>
            {paymentData.application.mediaService.mediaChannel.mediaName} Bill Summary Report
          </p>

         {/* <button className='btn btn-danger float-right'>Back</button> */}
          {/* <p style={{ fontSize: 14, marginBottom: 10 }}>{invoiceData.city}</p> */}
        </div>
        <div className="bill-details">
          <div className="bill-to">
            <h2 className='invoice-span mb-4' style={{ fontSize: 18, marginBottom: 10 }}>BILL FROM</h2>
            <p className='par'> 
              <span className='invoice-span'>Media Name: </span> 
              {paymentData.application.mediaService.mediaChannel.mediaName}
            </p>

            <p className='par'> 
              <span className='invoice-span'>Media Type: </span> 
              {paymentData.application.mediaService.mediaChannel.mediaType}
            </p>

            <p className='par'> 
              <span className='invoice-span'>Media Email: </span> 
              {paymentData.application.mediaService.mediaChannel.mediaEmail}
            </p>

            <h2 className='invoice-span mt-5'>Generated Controll Number</h2>
            <p style={{fontSize: 17}}> {paymentData.controlNumber}</p>
            

          </div>
          <div className="bill-number">
            <h2 className='invoice-span mb-4' style={{ fontSize: 18, marginBottom: 10 }}>BILL INFO</h2>
            <p className='par'>
              <span className='invoice-span'>Bill No </span>#00{paymentData.paymentId}
            </p>

            <p className='par'>
              <span className='invoice-span'>Bill Date </span> 
              {paymentData.paymentDate}
            </p>
          </div>
          {/* <div className="site-address">
            <h2 style={{ fontSize: 18, marginBottom: 10 }}>SITE ADDRESS</h2>
            <p style={{ fontSize: 14, marginBottom: 10 }}>{invoiceData.siteAddress}</p>
          </div> */}
        </div>
        <div className="items">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ fontSize: 15, padding: 10, borderBottom: '1px solid #ddd' }}>No</th>
                <th style={{ fontSize: 15, padding: 10, borderBottom: '1px solid #ddd' }}> Service Description</th>
                <th style={{ fontSize: 15, padding: 10, borderBottom: '1px solid #ddd' }}>Start Date</th>
                <th style={{ fontSize: 15, padding: 10, borderBottom: '1px solid #ddd' }}>End Date</th>
                <th style={{ fontSize: 15, padding: 10, borderBottom: '1px solid #ddd' }}>Total Days</th>
                <th style={{ fontSize: 15, padding: 10, borderBottom: '1px solid #ddd' }}>Unit Price</th>
                {/* <th style={{ fontSize: 15, padding: 10, borderBottom: '1px solid #ddd' }}>Review Status</th> */}
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
                {/* <td style={{ fontSize: 13, padding: 10, borderBottom: '1px solid #ddd' }}>{paymentData.application.reviewApplication.reviewStatus}</td> */}
                <td style={{ fontSize: 13, padding: 10, borderBottom: '1px solid #ddd' }}> TZS {paymentData.paidAmount}</td>
                <td style={{ fontSize: 13, padding: 10, borderBottom: '1px solid #ddd' }}> TZS {paymentData.application.amount - paymentData.paidAmount}</td>
                {/* <td style={{ fontSize: 13, padding: 10, borderBottom: '1px solid #ddd' }}> TZS {paymentData.application.amount - paymentData.paidAmount}</td> */}
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
          <p className='par'><span className='invoice-span'>Total:  </span>{paymentData.application.amount.toString()} TZS</p>
          
          <button className='btn btn-primary mt-4  mb-2' onClick={generatePDF}>
            <i className='fa fa-download'> </i> Print Bill</button>
            
        </div>
        

        {/* <div className="generate-pdf">
          <button className='btn btn-primary mt-3 mb-4' onClick={generatePDF}>
            <i className='fa fa-download'> </i> Print Bill</button>
        </div> */}
      </div>
    </div>
  );
};

export default ViewBill;