import React, { useState, useEffect } from "react";
import "./Leaderboard.css";
import axios from "axios";

function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3333/accounts").then((res) => {
      let retrievedScores = res.data.accounts.map((account) => ({
        score: account.best_score,
        user: account.username,
      }));
      let filteredScores = retrievedScores.filter(
        (score) => score.score
      );
      filteredScores.sort((a, b) => b.score.score - a.score.score);
      setScores(filteredScores);
    });
  }, []);

  function scoreInfo() {
    alert("Scores are calculated baesd on WPM, Accuracy, and Difficulty using the following schema:\n"+
          "WPM * speed_multiplier * diff_multiplier\n" +
          "speed_multiplier: 15s -> 0.9x, 30s -> 1x, 60x -> 1.066x\n" +
          "diff_multiplier: Normal -> 1x, Hard -> 1.18x\n" +
          "We confirmed these values with extensive testing. (eyeballing)")
  }

  return (
    <body>
    <div className="leaderboard-whole-body">
      <div className="leaderboard-title">
        <h1>Leaderboard</h1>
      </div>
      <div className="leaderboard-main-body">
        <div className="first-column">
          <h3>Rank</h3>
          <ul className = "column">
            {scores.map((score, index) => (
              <li key={index}> {index + 1} </li>
            ))}
          </ul>
        </div>
        <div className="second-column">
          <h3>User</h3>
          <ul className = "column">
            {scores.map((score, index) => (
              <li key={index}>
                <a href={`/profile/${score.user}`}>{score.user}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="third-column">
          <h3>WPM</h3>
          <ul className = "column">
            {scores.map((score, index) => (
              <li key={index}> {score.score.wpm} </li>
            ))}
          </ul>
        </div>
        <div className="fourth-column">
          <h3>Accuracy</h3>
          <ul className = "column">
            {scores.map((score, index) => (
              <li key={index}> {score.score.acc}% </li>
            ))}
          </ul>
        </div>
        <div className="fourth-column">
          <h3>Date</h3>
          <ul className = "column">
            {scores.map((score, index) => (
              <li key={index}> {score.score.date} </li>
            ))}
          </ul>
        </div>
        <div className="fifth-column">
          <h3>Time</h3>
          <ul className = "column">
            {scores.map((score, index) => (
              <li key={index}> {score.score.time} </li>
            ))}
          </ul>
        </div>
        <div className="sixth-column">
          <h3>Difficulty</h3>
          <ul className = "column">
            {scores.map((score, index) => (
              <li key={index}> {score.score.difficulty} </li>
            ))}
          </ul>
        </div>
        <div className="sixth-column">
          <h3>Score <button className="info-button" onClick={scoreInfo}>﹖</button></h3>
          <ul className = "column">
            {scores.map((score, index) => (
              <li key={index}> {score.score.score.toFixed(2)} </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </body>
);
}

export default Leaderboard;
