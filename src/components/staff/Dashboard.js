import React, { useEffect, useState } from 'react'
import { Navigation } from '../navigation/Navigation'
import { NavLink } from 'react-router-dom'
import axios from 'axios';

export const Dashboard = () => {

	const mediaId = parseInt(localStorage.getItem('mediaId'));

	const [noOfApp, setNoOfApp]  = useState(0);

	useEffect(()=>{
		axios.get('http://localhost:9000/api/applications/applications')
		.then((response)=>{
			const filteredApp = response.data.filter(application => application.mediaId === mediaId);

			// const f = response.data;
			const totalApp = filteredApp.length;
			setNoOfApp(totalApp);
		}).catch((error) => {
			console.error("Error Found",error);
		});
	}, []);

	const [pendingNo, setPendingNo] = useState(0);

	useEffect(()=>{
		axios.get('http://localhost:9000/api/applications/applications')
		.then((response)=>{
			const filterPending = response.data.filter(application => application.reviewStatus === 'pending' && application.mediaId === mediaId);

			const totalPending = filterPending.length;
			setPendingNo(totalPending);
		}).catch((error)=>{
			console.error("Error Found",error);
		});
	},[]);

	const [approveNo, setApproveNo]  = useState(0);

	useEffect(()=>{
		axios.get('http://localhost:9000/api/applications/applications')
		.then((response)=>{
			const filterApprove = response.data.filter(application => application.reviewStatus === 'Accepted' && application.mediaId === mediaId);

			const totalApprove = filterApprove.length;
			setApproveNo(totalApprove);
 		}).catch((error)=>{
			console.error("Error Found", error);
		});
	},[]);

	const [noOfService, setNoOfService] = useState(0);


	useEffect(()=>{
		axios.get(`http://localhost:9000/api/services/mediaId/${mediaId}`)
		.then((response)=>{

			const services = response.data;

			const totalService = services.length;

			setNoOfService(totalService);

		}).catch((error)=>{
			console.error("Error Found", error);
		});
	}, []);
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
                                <NavLink to='/staff-dashboard' className="head-link"> Main Dashboard</NavLink>
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
						<p class="mb-0 text-secondary">Total Application</p>
						<h4 class="my-1 text-info mt-4">{noOfApp}</h4>
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
					   <p class="mb-0 text-secondary">Pending Application</p>
					   <h4 class="my-1 text-danger mt-4">{pendingNo}</h4>
				   </div>
				   <div class="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
					<i class="fa fa-trello"></i>
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
					   <p class="mb-0 text-secondary">Accepted Application</p>
					   <h4 class="my-1 text-warning mt-4">{approveNo}</h4>
				   </div>
				   <div class="widgets-icons-2 rounded-circle bg-gradient-blooker text-white ms-auto">
					<i class="fa fa-ban"></i>
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
					   <h4 class="my-1 text-success mt-4">{noOfService}</h4>
				   </div>
				   <div class="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
					<i class="fa fa-gift"></i>
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
