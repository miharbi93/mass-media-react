import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditStaff = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [media, setMedia] = useState('');
    const [status, setStatus] = useState('');
    const [password, setPassword] = useState('');
    const [massMediaChannel, setMassMediaChannel] = useState([]);

    useEffect(() => {
        // Fetch staff details
        axios.get(`http://localhost:9000/api/staff/byId/${userId}`)
           .then((response) => {
                const staffData = response.data;
                setUsername(staffData.username);
                setEmail(staffData.email);
                setPhonenumber(staffData.phonenumber);
                setMedia(staffData.mediaChannel.mediaId); // Assuming mediaId is the identifier
                setStatus(staffData.status);
            });

        // Fetch media channels
        axios.get('http://localhost:9000/api/channel/all')
           .then((response) => {
                setMassMediaChannel(response.data);
            })
           .catch((error) => {
                console.error('Error Occurred', error);
            });
    }, [userId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedStaff = {
            username,
            email,
            // phonenumber,
            role: 'Staff',
            mediaChannel: {
                mediaId: parseInt(media),
            },
            status,
        };
    
        if (password) {
            updatedStaff.password = password;
        }
    
        console.log('Updated staff:', updatedStaff);
    
        axios.patch(`http://localhost:9000/api/staff/update/${userId}`, updatedStaff)
            .then(() => {
                // navigate('/staff');
            })
            .catch((error) => {
                console.error('There was an error updating the staff!', error);
            });
    };
   


    return (
        <form onSubmit={handleSubmit}>
            <h5 className='fw-bold mb-2 text-uppercase'>Update Media Channel Staff {userId}</h5>

            <div className='row'>
                <div className='row mt-5 mb-4'>
                    <div className='col-md-6'>
                        <label className='form-label'>Fullname</label>
                        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} className='form-control' />
                    </div>

                    <div className='col-md-6'>
                        <label className='form-label'>Email</label>
                        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' />
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-md-6'>
                        <label className='form-label'>Phonenumber</label>
                        <input type='text' value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} className='form-control' />
                    </div>

                    <div className='col-md-6'>
                        <label className='form-label'>Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className='form-control'>
                            <option value='Active'>Active</option>
                            <option value='Inactive'>Inactive</option>
                        </select>
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-md-6'>
                        <label className='form-label'>Select Mass Media</label>
                        <select value={media} onChange={(e) => setMedia(e.target.value)} className='form-control'>
                            {/* <option value=''>None</option> */}
                            {massMediaChannel.map((channel) => (
                                <option key={channel.mediaId} value={channel.mediaId}>
                                    {channel.mediaName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='col-md-6'>
                        <label className='form-label'>New Password</label>
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' />
                    </div>
                </div>

                <div className='row mt-4 mb-4'>
                    <div className='col-md-6'>
                        <button type='submit' className='btn btn-primary w-50'>Update</button>
                    </div>

                    <div className='col-md-6'>
                        <button type='button' onClick={() => navigate(-1)} className='btn btn-danger w-50'>Back</button>
                    </div>
                </div>
            </div>
        </form>
    );
};