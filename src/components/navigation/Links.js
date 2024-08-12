const links = {
    
    Admin:[
        { label: 'Dashboard', path: '/admin-dashboard', icon: 'dashboard' },

        { label: 'Manage Staff', path: '/manage-staff', icon:'users'},

        { label: 'Manage Channels', path: '/manage-channels', icon:'trello'},

        { label: 'Manage Customers', path: '/manage-customer', icon:'user'},

        { label: 'Account Settings', path:'/account-settings', icon:'cogs'}

    ],

    Staff:[
        { label:'Dashboard', path: '/staff-dashboard', icon: 'dashboard' },

        { label:'Manage Services', path: '/services', icon: 'trello' },

        { label: 'Payment Records', path: '/payments-info', icon: 'dollar' },


        { label:'Manage Application', path: '/applications', icon: 'list-ul' },

        { label: 'Channel Information', path: '/channel-info', icon: 'info-circle' },

        { label: 'Generate Report', path: '/generate-report', icon: 'download' },

        { label: 'Account Settings', path: '/setting-account', icon: 'cogs' }

    ],

    Customer:[
        {label:'Dashboard', path:'/dashboard', icon: 'dashboard'},

        // {label: 'Application Form', path:'/apply', icon:'th-list'},

        {label: 'My Applications ', path:'/application-list', icon:'inbox'},

        {label: 'Generate Bill', path:'/generate-bill',  icon:'download'},

        // {label: 'Payment Records', path:'/pay-records', icon:'gittip'},

        {label: 'Account Settings', path:'account-setting', icon:'cogs'}

    ]

}

export default links;