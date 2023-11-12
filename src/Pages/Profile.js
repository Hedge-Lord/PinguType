import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css"

function Profile({ authorized }) {
    let navigate = useNavigate();
    if (!authorized) {
        navigate('/login');
    }
    return <div>This is the profile page</div>;
}

export default Profile;