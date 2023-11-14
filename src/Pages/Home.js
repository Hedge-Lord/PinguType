import React from 'react';
import { useState } from 'react';
import './Home.css'
import logo from '../assets/pingutype.png';

import "../App.css"
function Home() {
  const [timerStarted, setTimerStarted] = useState(false);
  const [endTime, setEndTime] = useState(30);
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


  function setButtonTime(endTime) {
    setEndTime(endTime);
  }

return (
    <div>
        <div className="options">
            <button id="puncy" className="punctuation" onClick={() => toggleMenu(0)}> Punctuation </button>
            <button class = "center" id="numby" className="numbers" onClick={() => toggleMenu(1)}> Numbers </button>
            <button id="timey15" className="time15" onClick={() => {toggleMenu(3); setButtonTime(15)}}> 15s </button>
            <button id="timey30" className="time30" onClick={() => {toggleMenu(2); setButtonTime(30)}}> 30s </button>
            <button id="timey60" className="time60" onClick={() => {toggleMenu(4); setButtonTime(60)}}> 60s</button>
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
    </div>);
}

export default Home;