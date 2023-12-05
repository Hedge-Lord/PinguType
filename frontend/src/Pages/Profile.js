import React, { useState, useEffect }from 'react';
import { useParams } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import '../App.css';
import './Profile.css';
import Login from './Login';

function Profile({ imageUrl }) {
    const [loggedIn, setLoggedIn] = useState(null);
    const [scores, setScores] = useState([]);
    const params = useParams();

    useEffect(() => {
        console.log(params);
        axios.get('http://localhost:3333/check-auth', { withCredentials: true })
            .then(res => {
                if (res.data.auth) {
                    axios.get('http://localhost:3333/scores', { withCredentials: true })
                        .then(res => {
                            setScores(res.data.scores);
                        });
                }
                setLoggedIn(res.data.auth);
            });
    }, []); 

    function logout() {
        axios.get('http://localhost:3333/logout', {withCredentials: true});
        window.location.reload(false);
    }

    if (loggedIn === null) {
        return (
            <h1>Loading...</h1>
        );
    }
    else return loggedIn 
    ? (
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

        <button className="logout" onClick={logout}>Logout</button>

        <img src="https://media.istockphoto.com/id/1351147752/photo/studio-portrait-of-attractive-20-year-old-bearded-man.jpg?s=612x612&w=0&k=20&c=-twL1NKKad6S_EPrGSniewjh6776A0Ju27ExMh7v_kI=" 
            alt = 'pic'
            className='card-img'/>
        </div>

        <div className="card2">
            <div className="info">
                <div className= "stats">
                <h2> Completed Tests: </h2>
                <div>
                    <ul>
                        {scores.map((score, index) => (
                            <div className="score-card">
                                <li key={index}> 
                                    <div> Date: {score.date} </div>
                                    <div> WPM/ACC: {score.wpm} WPM / {score.acc}% ACC </div>
                                    <div> Difficulty: {score.difficulty} </div>
                                </li>
                             </div>
                        ))}
                    </ul>
                </div>
                </div>
            </div>
        </div>
    </div>
        ) 
    : (
        <Login />
    );
}

export default Profile;