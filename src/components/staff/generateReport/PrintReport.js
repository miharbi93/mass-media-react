import React, { useState, useLayoutEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';

export const PrintReport = () => {
  const [data, setData] = useState([]);
  const [pdf, setPdf] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);

  const mediaId = parseInt(localStorage.getItem('mediaId'));

  useLayoutEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios.get('http://localhost:9000/api/payment/payments')
        .then((response) => {
          const filteredData = response.data.filter(payment => payment.mediaId === mediaId && payment.amount <= payment.paidAmount && payment.reviewStatus === 'Accepted');
          setData(filteredData);
        });
      setTimeout(() => {
        setLoading(false);
      }, 1000); // 30 seconds
    };
    fetchData();
  }, []);

  useLayoutEffect(() => {
    const filterData = async () => {
      setLoading(true);
      const filteredData = data.filter((item) => {
        if (selectedYear || selectedMonth) {
          const itemDate = new Date(item.paymentDate);
          return itemDate.getFullYear() === parseInt(selectedYear) && itemDate.getMonth() === parseInt(selectedMonth) - 1;
        }
        return true;
      });
      setFilteredData(filteredData);
      setTimeout(() => {
        setLoading(false);
      }, 2000); // 30 seconds
    };
    filterData();
  }, [data, selectedYear, selectedMonth]);

  useLayoutEffect(() => {
    const generatePDF = async () => {
      try {
        const printButton = document.querySelector('.print-button');
        printButton.style.display = 'none'; // hide the print button

        const input = document.getElementById('report-content');

        if (!input) return; // add this check to ensure the element exists

        const pdfPageWidth = 210; // A4 width in mm
        const pdfPageHeight = 297; // A4 height in mm
        const margin = 15; // Margins in mm

        const canvas = await html2canvas(input);

        const imgData = canvas.toDataURL('image/png');

        const pdfDoc = new jsPDF('p', 'mm', [pdfPageWidth, pdfPageHeight]);

        const pdfWidth = (pdfPageWidth - 2 * margin) * 0.95; // 95% of the available width
        const pdfHeight = (pdfPageHeight - 2 * margin) * 0.95; // 95% of the available height

        const imgWidth = pdfWidth;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        const position = [margin, margin];

        pdfDoc.addImage(imgData, 'PNG', position[0], position[1], imgWidth, imgHeight);

        pdfDoc.setFontSize(5);

        const dateString = `${date.toLocaleDateString('en-US', { weekday: 'long' })} Printed ${date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })} ${date.toLocaleTimeString()}`;

        pdfDoc.text(dateString, margin, margin - 10, null, null, 'left');

        const pdfBlob = new Blob([pdfDoc.output('blob')], { type: 'application/pdf' });

        const pdfUrl = URL.createObjectURL(pdfBlob);

        console.log('Generated PDF URL:', pdfUrl);

        setPdf(pdfUrl);
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    };

    generatePDF();
  }, [filteredData]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div>
      <h5 className="fw-bold mb-5 text-uppercase">Generate Reports</h5>

      <div className='row'>
        <div className='col-md-1'>
          <label className='form-label'>Year:</label>
          <select className='form-select' value={selectedYear} onChange={handleYearChange}>
            <option value="">All</option>
            {Array.from(Array(5).keys()).map((year) => (
              <option value={new Date().getFullYear() - year}>{new Date().getFullYear() - year}</option>
            ))}
          </select>
          </div>
        <div className='col-md-1'>
          <label className='form-label'>Month:</label>
          <select className='form-select' value={selectedMonth} onChange={handleMonthChange}>
            <option value="">All</option>
            {Array.from(Array(12).keys()).map((month) => (
              <option value={month + 1}>{month + 1}</option>
            ))}
          </select>
        </div>

        <div className='col-md-5  mt-3'>

        </div>

      </div>
      {loading ? (
        <strong>
          <i className=' mt-5 fa fa-spinner fa-spin'> </i> Loading...
        </strong>
      ) : (
        <div id="report-content">

          <h2 className='text-center mb-4 mt-2'>{filteredData.mediaName} Mass Media Application  Reports</h2>


          {filteredData.length === 0 ? (
            <div className="card  alert alert-primary  alert-dismissible fade show">
              <div className="card-body">
                <h5 className="card-title"><i className='fa fa-warning'> </i>  No applications report found</h5>
                <p className="card-text">There are no applications report to display for {selectedYear} on Month {selectedMonth}</p>
              </div>
            </div>
          ) : (
            <>
              <h5 style={{ fontWeight: 'bolder' }}>List of Confirmed Application</h5>
              <table className="table table-bordered mt-4">
                <thead>
                  <tr>
                    <th>SN</th>
                    <th>Customer Name</th>
                    <th>Customer Email</th>
                    <th>APP ID</th>
                    <th>Service Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Days</th>
                    <th>Control Number</th>
                    <th>Status</th>
                    <th>Review Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.username}</td>
                      <td>{data.email}</td>
                      <td className='text-center'>#00{data.applicationId}</td>
                      <td>{data.serviceName}</td>
                      <td>{data.startDate}</td>
                      <td>{data.endDate}</td>
                      <td>{data.dayPackage}</td>
                      <td>{data.controlNumber}</td>
                      {/* <td>{data.amount - data.paidAmount}</td> */}
                      <td style={{ fontWeight: 'bold' }}>
                        {data.amount - data.paidAmount <= 0 ? 'Complete' : 'Incomplete'}
                      </td>
                      <td style={{ fontWeight: 'bold' }}>{data.reviewStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
      <a href={pdf} download="report.pdf">
        <button className="btn btn-primary print-button"><i className='fa fa-download'> </i> Print Report</button>
      </a>
    </div>
  );
};

export default PrintReport;