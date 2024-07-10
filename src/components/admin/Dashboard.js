import React, { useEffect, useState } from 'react'
import { Navigation } from '../navigation/Navigation'
import { NavLink } from 'react-router-dom'
import axios from 'axios';

export const AdminDashboard = () => {

	const  [staffCount, setStaffCount] = useState(0);

	const [mediaCount, setMediaCount] = useState(0);

	const [customerCount, setCustomerCount] = useState(0);

	const [serviceCount, setServiceCount] = useState(0);

	useEffect(()=>{
		axios.get('http://localhost:9000/api/staff/count')
		.then((response)=>{
			// console.log(response.data);
			setStaffCount(response.data)
		})
	});

	useEffect(()=>{
		axios.get('http://localhost:9000/api/channel/count')
		.then((response)=>{
			setMediaCount(response.data);
		})
	});

	useEffect(()=>{
		axios.get('http://localhost:9000/api/services/count')
		.then((response)=>{
			setServiceCount(response.data);
		})
	})

	useEffect(()=>{
		axios.get('http://localhost:9000/api/customer/count')
		.then((response)=>{
			setCustomerCount(response.data);
		})
	});
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

<div class="row row-cols-1 row-cols-md-2 row-cols-xl-4">
       <div class="col">
		 <div class="card radius-10 border-start border-0 border-3 border-info">
			<div class="card-body">
				<div class="d-flex align-items-center">
					<div>
						<p class="mb-0 text-secondary">Total Staff</p>
						<h4 class="my-1 text-info mt-4">{staffCount}</h4>
					</div>
					<div class="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto">
						<i class="fa fa-user"></i>
					</div>
				</div>
			</div>
		 </div>
	   </div>
	   <div class="col">
		<div class="card radius-10 border-start border-0 border-3 border-danger">
		   <div class="card-body">
			   <div class="d-flex align-items-center">
				   <div>
					   <p class="mb-0 text-secondary">Total Media Channel</p>
					   <h4 class="my-1 text-danger mt-4">{mediaCount}</h4>
				   </div>
				   <div class="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
					<i class="fa fa-trello"></i>
				   </div>
			   </div>
		   </div>
		</div>
	  </div>
	  <div class="col">
		<div class="card radius-10 border-start border-0 border-3 border-success">
		   <div class="card-body">
			   <div class="d-flex align-items-center">
				   <div>
					   <p class="mb-0 text-secondary">Total Services</p>
					   <h4 class="my-1 text-success mt-4">{serviceCount}</h4>
				   </div>
				   <div class="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
					<i class="fa fa-gift"></i>
				   </div>
			   </div>
		   </div>
		</div>
	  </div>
	  <div class="col">
		<div class="card radius-10 border-start border-0 border-3 border-warning">
		   <div class="card-body">
			   <div class="d-flex align-items-center">
				   <div>
					   <p class="mb-0 text-secondary">Total Customers</p>
					   <h4 class="my-1 text-warning mt-4">{customerCount}</h4>
				   </div>
				   <div class="widgets-icons-2 rounded-circle bg-gradient-blooker text-white ms-auto">
					<i class="fa fa-users"></i>
				   </div>
			   </div>
		   </div>
		</div>
	  </div> 
	</div>

    </div>    
    </div>
    </div>

        
    </>
    )
}
