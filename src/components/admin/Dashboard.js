import React, { useEffect, useState } from 'react';
import { Navigation } from '../navigation/Navigation';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const AdminDashboard = () => {
  const [staffCount, setStaffCount] = useState(0);
  const [mediaCount, setMediaCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [activeStaff, setActivestaff] = useState(0);
  const [inActiveStaff, setInActivestaff] = useState(0);
  const [activeCustomer, setActiveCustomer] = useState(0);
  const [inActiveCustomer, setInActiveCustomer] = useState(0);
  const [openMedia, setOpenMedia] = useState(0);
  const [closedMedia, setclosedMedia] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:9000/api/staff/count')
      .then((response) => setStaffCount(response.data));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:9000/api/channel/count')
      .then((response) => setMediaCount(response.data));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:9000/api/services/count')
      .then((response) => setServiceCount(response.data));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:9000/api/customer/count')
      .then((response) => setCustomerCount(response.data));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:9000/api/staff/all')
      .then((response) => {
        const filterActiveStaff = response.data.filter(staff => staff.account_status === 'Active');
        setActivestaff(filterActiveStaff.length);

        const filterInActiveStaff = response.data.filter(staff => staff.account_status === 'Inactive');
        setInActivestaff(filterInActiveStaff.length);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:9000/api/customer/all')
      .then((response) => {
        const filterActiveCustomer = response.data.filter(customer => customer.account_status === 'Active');
        setActiveCustomer(filterActiveCustomer.length);

        const filterInActiveCustomer = response.data.filter(customer => customer.account_status === 'Inactive');
        setInActiveCustomer(filterInActiveCustomer.length);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:9000/api/channel/all')
      .then((response) => {
        const filterOpenMedia = response.data.filter(media => media.status === 'Open');
        setOpenMedia(filterOpenMedia.length);

        const filterClosedMedia = response.data.filter(media => media.status === 'Closed');
        setclosedMedia(filterClosedMedia.length);
      });
  }, []);

  const staffData = {
    labels: ['Active Staff', 'Inactive Staff'],
    datasets: [{
      label: 'Staff Accounts',
      data: [activeStaff, inActiveStaff],
      backgroundColor: ['#00FF6F', '#f44336'],
    }]
  };

  const customerData = {
    labels: ['Active Customers', 'Inactive Customers'],
    datasets: [{
      label: 'Customer Accounts',
      data: [activeCustomer, inActiveCustomer],
      backgroundColor: ['#00FF6F', '#f44336'],
    }]
  };

  const mediaData = {
    labels: ['Open Media', 'Closed Media'],
    datasets: [{
      label: 'Media Channels',
      data: [openMedia, closedMedia],
      backgroundColor: ['#00FF6F', '#f44336'],
    }]
  };

  return (
    <>
      <Navigation />
      <div className='main mt-5'>
        <div className='content'>
          <div className='container-fluid mt-5'>
            <div className='content-header mb-5'>
              <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                  <li className='breadcrumb-iterm'>
                    <i className='fa fa-home'></i> Home /
                  </li>
                  <li className='breadcrumb-iterm active' aria-current="page">
                    <NavLink to='/admin-dashboard' className="head-link">Dashboard</NavLink>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div className='container-fluid'>
          <div className='row mb-5'>
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
              <div className="col">
                <div className="card radius-10 border-start border-0 border-3 border-info">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-secondary">Total Staff</p>
                        <h4 className="my-1 text-info mt-4">{staffCount}</h4>
                      </div>
                      <div className="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto">
                        <i className="fa fa-user"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card radius-10 border-start border-0 border-3 border-danger">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-secondary">Total Media Channel</p>
                        <h4 className="my-1 text-danger mt-4">{mediaCount}</h4>
                      </div>
                      <div className="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
                        <i className="fa fa-trello"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card radius-10 border-start border-0 border-3 border-success">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-secondary">Total Services</p>
                        <h4 className="my-1 text-success mt-4">{serviceCount}</h4>
                      </div>
                      <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                        <i className="fa fa-gift"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card radius-10 border-start border-0 border-3 border-warning">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-secondary">Total Customers</p>
                        <h4 className="my-1 text-warning mt-4">{customerCount}</h4>
                      </div>
                      <div className="widgets-icons-2 rounded-circle bg-gradient-blooker text-white ms-auto">
                        <i className="fa fa-users"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-5'>
                <Bar data={staffData} />
              </div>
              <div className='col-5 ms-5'>
                <Bar data={customerData} />
              </div>
            </div>

            <div className='row mt-2 mb-5'>
              <div className='col-5 mt-5'>
                <Bar data={mediaData} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
