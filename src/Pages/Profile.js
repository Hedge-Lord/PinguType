// Profile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Profile.css';

function Profile({ authorized, imageUrl }) {
    let navigate = useNavigate();
    if (!authorized) {
        navigate('/login');
    }
    return (
        <div className="card">
            <div className= "card1">
            <div className="profile-name">
                <h3>Profile Name</h3>
            </div>
            
            <div className="caption-container">
                <div className="caption">
                    <h4>Joined September 2023</h4>
                </div>
            </div>

            <img src="https://media.istockphoto.com/id/1351147752/photo/studio-portrait-of-attractive-20-year-old-bearded-man.jpg?s=612x612&w=0&k=20&c=-twL1NKKad6S_EPrGSniewjh6776A0Ju27ExMh7v_kI=" 
                alt = 'pic'
                className='card-img'/>
            </div>

            <div className="card2">
                <div className="info">
                    <div className= "stats">
                    <h2> Your Stats</h2>
                    <h4> Tests Completed: </h4>
                    <h4> Tests Started: </h4>
                    <h4> Time Typed: </h4>
                    </div>
                </div>
            </div>
            <div className="button1">
                <button> Edit Profile </button>
            </div>
            
            
        </div>
    );
}

export default Profile;
