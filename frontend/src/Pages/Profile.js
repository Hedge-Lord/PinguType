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
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [searchInput, setSearchInput] = useState(""); // Add state for search input
  const params = useParams();
  const navigate = useNavigate();

  const [averageWPM, setAverageWPM] = useState(0);
  const [averageAccuracy, setAverageAccuracy] = useState(0);

  const [highestWPM, setHighestWPM] = useState(0);
  const [highestAccuracy, setHighestAccuracy] = useState(0);

  const [averageScore, setAverageScore] = useState(0);
  
  const [joinDate, setJoinDate] = useState("");

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // all async effects
  useEffect(() => {
    if (params.username) {
      let currUser;
      axios
      .get("https://pingutype-backend-6f7213dfc12e.herokuapp.com/accounts/" + params.username + "/scores")
      .then((res) => {
        if (res.data.scores) {
          setScores(res.data.scores);
          setProfileLoad(true);
          setProfileName(params.username);
          axios.get('https://pingutype-backend-6f7213dfc12e.herokuapp.com/check-auth', { withCredentials: true })
          .then(res => {
            setLoggedIn(res.data.username == params.username);
            currUser = res.data.username;
          })
          .then(res => {
            axios.get("https://pingutype-backend-6f7213dfc12e.herokuapp.com/accounts/" + params.username + "/followers")
            .then(res => {
              if (res.data.followers) {
                setFollowers(res.data.followers);
                setIsFollowing(res.data.followers.some(user => user.username === currUser));
              }
            })
            .then(() => {
              axios.get("https://pingutype-backend-6f7213dfc12e.herokuapp.com/accounts/" + params.username + "/following")
              .then (res => {
                if (res.data.following) {
                  setFollowing(res.data.following);
                }
              });
            });
          })
          .then (() => {
            axios
              .get('https://pingutype-backend-6f7213dfc12e.herokuapp.com/accounts/' + params.username + '/accCreation')
              .then ((res) => {
                if (res.data.accCreation) {
                  setJoinDate(res.data.accCreation);
                }
              });
          });
        }
        else {
          navigate('/profile');
          window.location.reload(false);
        }
          });
    } else {
      axios.get('https://pingutype-backend-6f7213dfc12e.herokuapp.com/check-auth', { withCredentials: true })
      .then(res => {
          if (res.data.auth) {
              axios.get('https://pingutype-backend-6f7213dfc12e.herokuapp.com/scores', { withCredentials: true })
                  .then(res => {
                      setScores(res.data.scores);
                  });
              navigate("/profile/" + res.data.username, { replace: true });
              setProfileName(res.data.username);
          } 
          setProfileLoad(res.data.auth);
          setLoggedIn(res.data.auth);
      });
    }  
  }, [params.username]);

  useEffect(() => {
    if (scores.length > 0) {
      const totalWPM = scores.reduce((sum, score) => sum + score.wpm, 0);
      const totalAccuracy = scores.reduce((sum,score) => sum + score.acc, 0);
      const totalScore = scores.reduce((sum, score) => sum + score.score, 0);

      const avgWPM = totalWPM / scores.length;
      const avgAccuracy = totalAccuracy / scores.length;
      const avgScore = totalScore / scores.length;

      setAverageWPM(avgWPM);
      setAverageAccuracy(avgAccuracy);
      setAverageScore(avgScore);

      const maxWPM = Math.max(...scores.map(score => score.wpm));
      const maxAccuracy = Math.max(...scores.map(score => score.acc));

      setHighestWPM(maxWPM);
      setHighestAccuracy(maxAccuracy);
    }
  }, [scores])

  function getSearchText(e) {
    setSearchInput(e.target.value);
  }
  function searchUser(event) {
    if (event.key === 'Enter') {
        navigate('/profile/'+searchInput)
    }
  }

  function logout() {
    axios.get("https://pingutype-backend-6f7213dfc12e.herokuapp.com/logout", { withCredentials: true });
    navigate("/login");
    window.location.reload(false);
  }

  function handleFollow() {
    axios.get("https://pingutype-backend-6f7213dfc12e.herokuapp.com/check-auth", { withCredentials: true })
      .then((res) => {
        if (res.data.auth) {
          axios.get("https://pingutype-backend-6f7213dfc12e.herokuapp.com/get-user-id", { withCredentials: true })
            .then((res) => {
              axios.post("https://pingutype-backend-6f7213dfc12e.herokuapp.com/accounts/" + profileName + "/followers", { user_id: res.data.user_id })
                .then((resp) => {
                  // do something with resp
                  // resp.success, resp.newFollower
                  //if (resp.success) {
                  window.location.reload();
                  //}
                });
            });
        } else {
          alert("Need to be logged in to follow accounts.");
          navigate("/login");
        }
      });
  }

  function handleUnfollow() {
      axios.delete("https://pingutype-backend-6f7213dfc12e.herokuapp.com/accounts/" + profileName + "/followers", {withCredentials: true})
      .then(res => {
        console.log(res);
        // do something with res
        // res.success, res.unfollow
        window.location.reload(false);
      });
  }

  if (profileLoad === null) {
    return <h1>Loading...</h1>;
  } else
    return profileLoad ? (

    <div>

      <div className="card">
        <div className="card1">
          <img src="https://www.freeiconspng.com/thumbs/penguin-icon/penguin-icon-18.jpg" 
                alt="Profile Image"
                className="profile-image" />
          <div className="profile-info">
            <div className="profile-name">
              <h3>{profileName}</h3>
            </div>
            <div className="caption">
                <h4>Joined {joinDate ? formatDate(joinDate) : "Loading..."}</h4>
            </div>

          </div>

          <div className="profile-button">
            {loggedIn && (
              <button className="logout" onClick={logout}>
                Logout
              </button>
            ) || !loggedIn && (
              !isFollowing && (<button className="follow" onClick={handleFollow}>
                Follow
                            </button>) || 
              isFollowing && (<button className="follow" onClick={handleUnfollow}>
              Unfollow
                            </button>)
            )}
          </div>

            <div className="add-following">
              <div> Search For Users: </div>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Type in existing user"
                  value={searchInput}
                  onChange={getSearchText}
                  onKeyDown={searchUser}
                />
              </div>
            </div>

        </div>

        <div className="main-body">
          <div className="tests-card">
            <h2> Completed Tests: {scores.length} </h2>
              <div>
                <ul>
                  {scores.toReversed().map((score, index) => (
                    <div className="score-card">
                      <div className="penguin-icon">
                        🐧
                      </div>
                      <div className="test-info">
                        <li key={index}>
                          <div> {score.date} </div>
                          <div>
                            {" "}
                            WPM: {score.wpm} -- ACC: {score.acc}% -- Score: {score.score.toFixed(2)}
                          </div>
                          <div> Difficulty: {score.difficulty} </div>
                          <div> Time: {score.time}s </div>
                        </li>
                      </div>

                    </div>
                  ))}
                </ul>
              </div>
          </div>

          <div>
          <div className="stats-card">
              <h2> Personal Stats </h2>
              <div className="avg-stats">
                <div className="avg-wpm"> 
                  <div> Average WPM </div>
                  <div className="wpm"> {averageWPM.toFixed(2)} </div>
                </div>

                <div className="avg-acc">
                  <div> Average Accuracy </div>
                  <div className="acc"> {averageAccuracy.toFixed(2)}% </div>
                </div>
              </div>

              <div className="max-stats">
                <div className="max-wpm"> 
                  <div> Best WPM </div>
                  <div className="wpm"> {highestWPM.toFixed(2)} </div>
                </div>

                <div className="avg-score">
                  <div> Average Score{' '} 
                    <button className="profile-info-button" onClick={() => alert("Score calculated for leaderboard purposes. Check leaderboard for more information.")}>
                        ?
                    </button>
                  </div>
                  <div className="score"> {averageScore.toFixed(2)} </div>

                </div>
              </div>
          </div>

          <div className="follow-cards">
            <div className="main-follower-card">
              <h2>Followers: {followers.length}</h2>
              <ul>
                {followers.map((follower, index) => (
                  <div className="follower-card" key={index}>
                    <div className="follower-info">
                      <li>
                        <div>
                        <img src="https://www.freeiconspng.com/thumbs/penguin-icon/penguin-icon-18.jpg" 
                            alt={`${follower.username}'s profile`}
                            className="follower-image" />
                        <a href={`/profile/${follower.username}`} className="follower-name">{follower.username}</a>
                        </div>
                      </li>
                    </div>
                  </div>
                ))}
              </ul>
            </div>

            <div className="main-following-card">
              <h2>Following: {following.length}</h2>
              <ul>
                {following.map((follower, index) => (
                  <div className="follower-card" key={index}>
                    <div className="follower-info">
                      <li>
                        <div>
                        <img src="https://www.freeiconspng.com/thumbs/penguin-icon/penguin-icon-18.jpg" 
                            alt={`${follower.username}'s profile`}
                            className="follower-image" />
                        <a href={`/profile/${follower.username}`} className="follower-name">{follower.username}</a>
                        </div>
                      </li>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
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