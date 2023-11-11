import React, { useState } from 'react';
import './App.css';

function App() {
  const [timerStarted, setTimerStarted] = useState(false);

  function toggleMenu(x) {
    let element, e2, e3;

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
        element = document.getElementById("timey30");
        element.classList.toggle("time30-clicked");
        e2 = document.getElementById("timey15");
        e3 = document.getElementById("timey60");
        if (e2.className !== "time15") {
          e2.classList.toggle("time-clicked");
        }
        if (e3.className !== "time60") {
          e3.classList.toggle("time-clicked");
        }
        return;
      case 3:
        element = document.getElementById("timey15");
        element.classList.toggle("time-clicked");
        e2 = document.getElementById("timey30");
        e3 = document.getElementById("timey60");
        if (e2.className === "time30") {
          e2.classList.toggle("time30-clicked");
        }
        if (e3.className !== "time60") {
          e3.classList.toggle("time-clicked");
        }
        return;
      case 4:
        element = document.getElementById("timey60");
        element.classList.toggle("time-clicked");
        e2 = document.getElementById("timey30");
        e3 = document.getElementById("timey15");
        if (e2.className === "time30") {
          e2.classList.toggle("time30-clicked");
        }
        if (e3.className !== "time15") {
          e3.classList.toggle("time-clicked");
        }
        return;
      default:
        return;
    }
  }

  function startTimer() {
    let countDown = 0;
    const endTime = 5;
    const timerDisplay = document.getElementById("time");
    const update = setInterval(function () {
      const now = countDown++;
      timerDisplay.innerHTML = "Time elapsed: " + countDown;

      if (countDown > endTime) {
        clearInterval(update);
        timerDisplay.innerHTML = "Time's up!!!";
      }
    }, 1000);
  }

  function startTimerOnce() {
    if (!timerStarted) {
      startTimer();
      setTimerStarted(true);
    }
  }

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title> PinguType </title>
      <link rel="stylesheet" href="../styles/style.css" />
      <link rel="shortcut icon" href="../assets/favicon.ico" type="image/x-icon" />
      <header>
        <img src="../assets/pingutype.png" id="logo" alt="PinguType Logo" />
        <div className="title">
          <p>pingutype</p>
          <p className="subtext">a typing tool for penguins.</p>
        </div>
      </header>
      <br />
      <div className="options">
        <button id="puncy" className="punctuation" onClick={() => toggleMenu(0)}>
          Punctuation
        </button>
        <button id="numby" className="numbers" onClick={() => toggleMenu(1)}>
          Numbers
        </button>
        <button id="timey15" className="time15" onClick={() => toggleMenu(3)}>
          15s
        </button>
        <button id="timey30" className="time30" onClick={() => toggleMenu(2)}>
          30s
        </button>
        <button id="timey60" className="time60" onClick={() => toggleMenu(4)}>
          60s
        </button>
      </div>
      <div id="typing-test">
        <label htmlFor="typing-area">
          Type away! PinguType is a WIP. Typing speed test functionality has not yet been implemented.
        </label>
        <div id="timerDisplay">
          <h3 id="time">Start typing to start the timer</h3>
        </div>
        <textarea
          id="typing-area"
          rows={17}
          cols={120}
          onChange={startTimerOnce}
        />
      </div>
    </div>
  );
}

export default App;
