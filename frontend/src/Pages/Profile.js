import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import "../App.css";
import "./Profile.css";
import Login from "./Login";

function Profile({ imageUrl }) {
  const [profileLoad, setProfileLoad] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  const [scores, setScores] = useState([]);
  const [profileName, setProfileName] = useState("");
  const params = useParams(); //call params.user
  console.log(params);
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
        }
        else {
          navigate('/profile');
          window.location.reload(false);
        }
          });
      // navigate("/profile/" + res.data.username);
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
  }, []);

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
          </div>
          {loggedIn && (
              <button className="logout" onClick={logout}>
                Logout
              </button>
            )}

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