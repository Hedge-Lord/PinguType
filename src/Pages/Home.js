import React from 'react';
import { useState } from 'react';
import './Home.css'
import "../App.css"

function Home() {
  const [timerStarted, setTimerStarted] = useState(false);
  const [endTime, setEndTime] = useState(30);

  function startTimer() {
    if (!timerStarted)
    {
      setTimerStarted(true);
      var countDown = endTime;
      var timerDisplay = document.getElementById("time");
      var update = setInterval(function () {
        var now = countDown--;
        timerDisplay.innerHTML = "Time: " + countDown;
  
  
        if (countDown == 0) {
          clearInterval(update);
            timerDisplay.innerHTML = "Time's up!!!";
        }
      }, 1000);
    }
  }

  const [enabledTime, setEnabledTime] = useState("timey30");
  function handleTimeClick(time) {
    document.getElementById(enabledTime).classList.toggle("button-clicked");
    document.getElementById(time).classList.toggle("button-clicked");
    setEnabledTime(time);
  }

  function handleClick(id) {
    document.getElementById(id).classList.toggle("button-clicked");
  }

return (
    <>
        <div className="options">
            <button id="puncy" onClick={() => handleClick("puncy")}> Punctuation </button>
            <button class = "center" id="numby" onClick={() => handleClick("numby")}> Numbers </button>
            <button id="timey15" onClick={() => {handleTimeClick("timey15"); setEndTime(15)}}> 15s </button>
            <button id="timey30" className="button-clicked" onClick={() => {handleTimeClick("timey30"); setEndTime(30)}}> 30s </button>
            <button id="timey60" onClick={() => {handleTimeClick("timey60"); setEndTime(60)}}> 60s</button>
        </div>
        <div id="typing-test">
            <label htmlFor="typing-area">
            Type away! PinguType is a WIP. Typing speed test functionality has not yet been implemented.
            </label>
            <div id="timerDisplay">
            <h3 id="time">Start typing to start the timer</h3>
            </div>
            <textarea id="typing-area" rows="17" cols="120" onInput={() => startTimer()} placeholder="Type in here!"></textarea>
        </div>
    </>);
}

export default Home;