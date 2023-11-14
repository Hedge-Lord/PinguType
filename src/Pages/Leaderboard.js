import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import './Leaderboard.css'

function retrieveTop5() {
    const user1 = {userName:"George", WPM:200, date: "11/13/2023"};
    const user2 = {userName:"Jacob", WPM:113, date: "11/13/2023"};
    const user3 = {userName:"Allison", WPM:101, date: "11/13/2023"};
    const user4 = {userName:"Andrew", WPM:100, date: "11/13/2023"};
    const user5 = {userName:"Radhika", WPM:20, date: "11/13/2023"};
    const top5array = [user1, user2, user3, user4, user5]
    return top5array
}


function Leaderboard() {
    const [time15enabled, setTime15enabled] = useState(false);
    const [time30enabled, setTime30enabled] = useState(true);
    const [time60enabled, setTime60enabled] = useState(false);
    function toggleMenu(x) {
        var element; var e2; var e3;
        switch (x) {
          case 0: 
            element = document.getElementById("puncy");
            element.classList.toggle("punctuation-clicked");
            return;
          case 1:
            element = document.getElementById("numby");
            element.classList.toggle("numbers-clicked");
            return;
          case 2:
            if (time30enabled === false) {
              element = document.getElementById("timey30");
              element.classList.toggle("time30-clicked")
              var e2 = document.getElementById("timey15");
              var e3 = document.getElementById("timey60");
              if (e2.className !== "time15") {
                e2.classList.toggle("time-clicked");
                setTime15enabled(!time15enabled);
              } if (e3.className !== "time60") {
                e3.classList.toggle("time-clicked");
                setTime60enabled(!time60enabled);
              }
              setTime30enabled(!time30enabled);
            }
            return;
          case 3:
            if (time15enabled === false) {
              element = document.getElementById("timey15");
              element.classList.toggle("time-clicked")
              e2 = document.getElementById("timey30");
              e3 = document.getElementById("timey60");
              if (e2.className === "time30") {
                e2.classList.toggle("time30-clicked");
                setTime30enabled(!time30enabled);
              } if (e3.className !== "time60") {
                e3.classList.toggle("time-clicked");
                setTime60enabled(!time60enabled);
              }
              setTime15enabled(!time15enabled);
            }
            return;
          case 4:
            if (time60enabled === false) {
              element = document.getElementById("timey60");
              element.classList.toggle("time-clicked")
              e2 = document.getElementById("timey30");
              e3 = document.getElementById("timey15");
              if (e2.className === "time30") {
                e2.classList.toggle("time30-clicked");
                setTime30enabled(!time30enabled);
              } if (e3.className !== "time15") {
                e3.classList.toggle("time-clicked");
                setTime15enabled(!time15enabled);
              }
              setTime60enabled(!time60enabled);
            }
            return;
        }
      }
    return(
        <body>
            <div className="leaderboard-whole-body">
                <div className="leaderboard-title">
                    <h1>Leaderboard</h1>
                </div>
                <div className="options">
                    <button id="puncy" className="punctuation" onClick={() => toggleMenu(0)}> Punctuation </button>
                    <button class = "center" id="numby" className="numbers" onClick={() => toggleMenu(1)}> Numbers </button>
                    <button id="timey15" className="time15" onClick={() => {toggleMenu(3)}}> 15s </button>
                    <button id="timey30" className="time30" onClick={() => {toggleMenu(2)}}> 30s </button>
                    <button id="timey60" className="time60" onClick={() => {toggleMenu(4)}}> 60s</button>
                </div>
                <div className="leaderboard-main-body">
                    <div className="first-column">
                        <h3>Rank</h3>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                    </div>
                    <div className="second-column">
                        <h3>User</h3>
                        <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}><p className="second-column-elements">{retrieveTop5()[0].userName}</p></Link>
                        <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}><p className="second-column-elements">{retrieveTop5()[1].userName}</p></Link>
                        <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}><p className="second-column-elements">{retrieveTop5()[2].userName}</p></Link>
                        <Link to="/profile"style={{ textDecoration: 'none', color: 'black' }}><p className="second-column-elements">{retrieveTop5()[3].userName}</p></Link>
                        <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}><p className="second-column-elements">{retrieveTop5()[4].userName}</p></Link>
                    </div>
                    <div className="third-column">
                        <h3>WPM</h3>
                        <p>{retrieveTop5()[0].WPM}</p>
                        <p>{retrieveTop5()[1].WPM}</p>
                        <p>{retrieveTop5()[2].WPM}</p>
                        <p>{retrieveTop5()[3].WPM}</p>
                        <p>{retrieveTop5()[4].WPM}</p>
                    </div>
                    <div className="fourth-column">
                        <h3>Date</h3>
                        <p>{retrieveTop5()[0].date}</p>
                        <p>{retrieveTop5()[1].date}</p>
                        <p>{retrieveTop5()[2].date}</p>
                        <p>{retrieveTop5()[3].date}</p>
                        <p>{retrieveTop5()[4].date}</p>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Leaderboard;