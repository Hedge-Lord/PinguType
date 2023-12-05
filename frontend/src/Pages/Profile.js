import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import '../App.css';
import './Profile.css';
import Login from './Login';

function Profile({ imageUrl }) {
  const [profileLoad, setProfileLoad] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  const [scores, setScores] = useState([]);
  const [profileName, setProfileName] = useState("");
  const [searchInput, setSearchInput] = useState(""); // Add state for search input
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.username) {
      console.log("load user prof");
      axios
      .get("http://localhost:3333/accounts/" + params.username + "/scores")
      .then((res) => {
        if (res.data.scores) {
          setScores(res.data.scores);
          setProfileLoad(true);
          setProfileName(params.username);
          axios.get('http://localhost:3333/check-auth', { withCredentials: true })
          .then(res => {
            setLoggedIn(res.data.username == params.username);
          })
        }
        else {
          navigate('/profile');
          window.location.reload(false);
        }
          });
    } else {
      axios.get('http://localhost:3333/check-auth', { withCredentials: true })
      .then(res => {
          if (res.data.auth) {
              axios.get('http://localhost:3333/scores', { withCredentials: true })
                  .then(res => {
                      setScores(res.data.scores);
                  });
              navigate("/profile/" + res.data.username);
              setProfileName(res.data.username);
          } 
          setProfileLoad(res.data.auth);
          setLoggedIn(res.data.auth);
      });
    }
  }, [params.username]);
  function getSearchText(e) {
    setSearchInput(e.target.value);
  }
  function searchUser(event) {
    if (event.key === 'Enter') {
        navigate('/profile/'+searchInput)
    }
  }

  function logout() {
    axios.get("http://localhost:3333/logout", { withCredentials: true });
    navigate("/profile");
    window.location.reload(false);
  }

  if (profileLoad === null) {
    return <h1>Loading...</h1>;
  } else
    return profileLoad ? (
        
      <div className="card">
        <div className="card1">
          <div className="profile-name">
            <h3>{profileName}'s Account</h3>
          </div>
          <div className="caption-container">
            <div className="caption">
              <h4>Joined September 2023</h4>
            </div>
            <div className="search-bar">
            <input
              type="text"
              placeholder="Search an existing user"
              value={searchInput}
              onChange={getSearchText}
              onKeyDown={searchUser}
            />
          </div>
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
                        <div> Time: {score.time} </div>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {loggedIn && (
              <button className="logout" onClick={logout}>
                Logout
              </button>
            ) || !loggedIn && (<button className="follow" >
                Follow
            </button>)}

        </div>
      </div>
    ) : (
      <Login />
    );
}

export default Profile;