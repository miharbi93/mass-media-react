import logo from './logo.svg';
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, ToastPosition } from 'react-toastify';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css' 
import './../node_modules/font-awesome/css/font-awesome.min.css'
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Navigation } from './components/navigation/Navigation';
import { Dashboard } from './components/staff/Dashboard';
import { AdminDashboard } from './components/admin/Dashboard';
import { CustomerDashboard } from './components/customer/Dashboard';
import { Services } from './components/staff/services/Services';
import { ViewService } from './components/staff/services/ViewService';
import { EditService } from './components/staff/services/EditService';
import { NewService } from './components/staff/services/NewService';
import { Applications } from './components/staff/applications/Applications';
import { ViewApplications } from './components/staff/applications/ViewApplication';
import { Channel } from './components/staff/channels/Channel';
import { ChannelInfo } from './components/staff/channels/ChannelInfo';
import { Channels } from './components/admin/managechannels/Channels';
import { ViewChannels } from './components/admin/managechannels/ViewChannels';
import { NewChannel } from './components/admin/managechannels/NewChannel';
import { Staff } from './components/admin/managestaff/Staff';
import { ViewStaff } from './components/admin/managestaff/ViewStaff';
import { NewStaff } from './components/admin/managestaff/NewStaff';
import { EditChannel } from './components/admin/managechannels/EditChannel';
import { EditStaff } from './components/admin/managestaff/EditStaff';
import { Customer } from './components/admin/managecustomer/Customers';
import { ViewCustomer } from './components/admin/managecustomer/ViewCustomer';
import { NewCustomer } from './components/admin/managecustomer/NewCustomer';
import { Account } from './components/admin/accountsetting/Account';
import { AccountSetting } from './components/admin/accountsetting/AccountSetting';
import { EditCustomer } from './components/admin/managecustomer/EditCustomer';
import { ApplicationForm } from './components/customer/application/ApplicationForm';
import { Application } from './components/customer/application/Application';
import { ViewApplication } from './components/customer/viewapplication/ViewApplication';
import { ViewApp } from './components/customer/viewapplication/ViewApp';
import { Invoice } from './components/Invoice';
import { Bill } from './components/customer/bill/Bill';
import ViewBill from './components/customer/bill/ViewBill';
import { GenerateBill } from './components/customer/bill/GenerateBill';
import { Payment } from './components/staff/payments/payment';
import { ViewPaymentRecord } from './components/staff/payments/ViewPaymentRecord';
import { AccountSettings } from './components/staff/accountSetting/AccountSetting';
import { Accounts } from './components/staff/accountSetting/Accounts';
import { Reports } from './components/staff/generateReport/Reports';
import { PrintReport } from './components/staff/generateReport/PrintReport';
import { AccountCustomer } from './components/customer/accountsetting/Accounts';
import { CustomerAccount } from './components/customer/accountsetting/CustomerAccount';
import { ResetPassword } from './components/ResetPassword';



function App() {
  return (
    <Routes>

        <Route path='/invoice' element={<Invoice/>} />

        <Route path='/' element={<Login/>} />
        <Route path='new-account' element={<Register/>} />
        <Route path='/reset-password' element={<ResetPassword/>}/>

        {/* Admin */}

        <Route path='/admin-dashboard' element={<AdminDashboard/>} />
        
        <Route path='/manage-channels' element={<Channels/>} >
        
          <Route index element={<ViewChannels/>}/>
          <Route path='view-channels' element={<ViewChannels/>} />
          <Route path='new-channel' element={<NewChannel/>} />
          <Route path='edit-channel/:mediaId' element={<EditChannel/>} />

        </Route>

        <Route path='/manage-staff' element={<Staff/>} >
          <Route index element={<ViewStaff/>} />
          <Route path='view-staff' element={<ViewStaff/>}/>
          <Route path='new-staff' element={<NewStaff/>} />
          <Route path='edit-staff/:userId' element={<EditStaff/>} />
        </Route>

        <Route path='/manage-customer' element={<Customer/>}>
          <Route index element={<ViewCustomer/>} />
          <Route path='view-customer' element={<ViewCustomer/>} />
          <Route path='new-customer' element={<NewCustomer/>} />
          <Route path='edit-customer/:userId' element={<EditCustomer/>} />
        
        </Route>

        <Route path='/account-settings' element={<Account/>}>
          <Route index element={<AccountSetting/>} />
          <Route path='account-setting' element={<AccountSetting/>} />
        </Route>

        {/* Staff */}

        <Route path='/staff-dashboard' element={<Dashboard/>} />

        <Route path='/services' element={<Services/>} >

            <Route index element={<ViewService/>} />
            <Route path='view-service' element={<ViewService/>} />
            <Route path='edit-service/:serviceId' element={<EditService/>} />
            <Route path='new-service' element={<NewService/>} />
        
        </Route>

        <Route path='/applications' element={<Applications/>}>
          
          <Route index element={<ViewApplications/>} />
          <Route path='view-applications' element={<ViewApplications/>}/>
        
        </Route>

        <Route path='channel-info' element={<Channel/>} >

          <Route index element={<ChannelInfo/>}/>
          <Route path='channel-info' element={<ChannelInfo/>} />
        
        </Route>

        <Route path='payments-info' element={<Payment/>}>
            <Route index element={<ViewPaymentRecord/>} />
            <Route path='payments-info' element={<ViewPaymentRecord/>} />
        </Route>

        <Route path='/setting-account' element={<Accounts/>}>
          <Route index element={<AccountSettings/>} />
          <Route path='account-settin' element={<AccountSettings/>} />
        
        </Route>

        <Route path='generate-report' element={<Reports/>}>
          <Route index element={<PrintReport/>}/>
        
        </Route>

        

        {/* Customer */}

        <Route path='dashboard' element={<CustomerDashboard/>} />

        <Route path='apply/:mediaId' element={<Application/>}>
          <Route index element={<ApplicationForm/>}/>
          <Route path='application-form' element={<ApplicationForm/>} />
        </Route>

        <Route path='/application-list' element={<ViewApp/>}>
          <Route index element={<ViewApplication/>}/>
          <Route path='/application-list' element={<ViewApplication/>}/>

        </Route>

        <Route path='/generate-bill' element={<Bill/>} >
          <Route index element={<GenerateBill/>} />
          <Route path='view-bill/:applicationId' element={<ViewBill/>} />
        
        </Route>

        <Route path='/account-setting' element={<AccountCustomer/>}>
          <Route index element={<CustomerAccount/>}/>
        </Route>


         
    </Routes>
  );
}

export default App;
