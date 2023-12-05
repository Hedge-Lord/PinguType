import React, { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import '../App.css';
import './Profile.css';
import Login from './Login';

function Profile({ imageUrl }) {
    const [loggedIn, setLoggedIn] = useState(null);
    const [scores, setScores] = useState([]);

    useEffect(() => {
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
    axios.get("http://localhost:3333/logout", { withCredentials: true });
    window.location.reload(false);
  }

  if (loggedIn === null) {
    return <h1>Loading...</h1>;
  } else
    return loggedIn ? (
      <div className="card">
        <div className="card1">
          <div className="profile-name">
            <h3>{profileName}'s Account</h3>
          </div>
          <div className="caption-container">
            <div className="caption">
              <h4>Joined September 2023</h4>
            </div>
          </div>

          <button className="logout" onClick={logout}>
            Logout
          </button>

          <img
            src="https://www.pinkandgreene.com/media/catalog/product/cache/1/image/334x/060688381b5b14a7115e480bc24e4ef1/0/0/001_4_27.jpg"
            alt="pic"
            className="card-img"
          />
        </div>

        <div className="card2">
          <div className="info">
            <div className="stats">
              <h2> Completed Tests: </h2>
              <div>
                <ul>
                  {scores.map((score, index) => (
                    <div className="score-card">
                      <li key={index}>
                        <div> Date: {score.date} </div>
                        <div>
                          {" "}
                          WPM/ACC: {score.wpm} WPM / {score.acc}% ACC{" "}
                        </div>
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
    ) : (
      <Login />
    );
}

export default Profile;