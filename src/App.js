import React, { useState } from 'react';

export default function Home() {
  const [timerStarted, setTimerStarted] = useState(false);
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
        element = document.getElementById("timey30");
        element.classList.toggle("time30-clicked")
        var e2 = document.getElementById("timey15");
        var e3 = document.getElementById("timey60");
        if (e2.className !== "time15") {
          e2.classList.toggle("time-clicked");
        } if (e3.className !== "time60") {
          e3.classList.toggle("time-clicked")
        }
        return;
      case 3:
        element = document.getElementById("timey15");
        element.classList.toggle("time-clicked")
        e2 = document.getElementById("timey30");
        e3 = document.getElementById("timey60");
        if (e2.className == "time30") {
          e2.classList.toggle("time30-clicked");
        } if (e3.className !== "time60") {
          e3.classList.toggle("time-clicked")
        }
        return;
      case 4:
        element = document.getElementById("timey60");
        element.classList.toggle("time-clicked")
        e2 = document.getElementById("timey30");
        e3 = document.getElementById("timey15");
        if (e2.className == "time30") {
          e2.classList.toggle("time30-clicked");
        } if (e3.className !== "time15") {
          e3.classList.toggle("time-clicked")
        }
        return;
    }
}
  function startTimer() {
    //make endTime into a parameter that changes based on the buttons
  var countDown = 0;
  var endTime = 5;
  var timerDisplay = document.getElementById("time");
  var update = setInterval(function () {
      var now = countDown++;
      timerDisplay.innerHTML = "Time: " + countDown;


      if (countDown > endTime) {
          clearInterval(update);
          timerDisplay.innerHTML = "Time's up!!!";
      }
  }, 1000);
  }


  function startTimerOnce(){
    if (!timerStarted)
    {
        startTimer();
        setTimerStarted(true);
    }
  }

  return (
    <div>
      <header style={{ paddingLeft: '89px' }}>
        <img src = "./pingutype.png" id="logo" alt="PinguType Logo" />
        <div className="title">
            pingutype
          <p className="subtext">a typing tool for penguins.</p>
        </div>
        <div>
          <button>Sign-In</button>
        </div>
      </header>
      <div className="options">
        <button id="puncy" className="punctuation" onClick={() => toggleMenu(0)}> Punctuation </button>
        <button class = "center" id="numby" className="numbers" onClick={() => toggleMenu(1)}> Numbers </button>
        <button id="timey15" className="time15" onClick={() => toggleMenu(3)}> 15s </button>
        <button id="timey30" className="time30" onClick={() => toggleMenu(2)}> 30s </button>
        <button id="timey60" className="time60" onClick={() => toggleMenu(4)}> 60s</button>
      </div>
      <div id="typing-test">
        <label htmlFor="typing-area">
          Type away! PinguType is a WIP. Typing speed test functionality has not yet been implemented.
        </label>
        <div id="timerDisplay">
          <h3 id="time">Start typing to start the timer</h3>
        </div>
        <textarea id="typing-area" rows="17" cols="120" onInput={() => startTimerOnce()}></textarea>
      </div>
    </div>
  );
}

function SignIn() {
  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>PinguType</title>
      <link rel="stylesheet" href="../styles/style.css" />
      <link rel="shortcut icon" href="../assets/favicon.ico" type="image/x-icon" />
    </head>
    <body>
      <header>
        <img src="./pingutype.png" id="logo" alt="PinguType Logo" />
        <div className="title">
          <a href="index.html" style={{ textDecoration: 'none', color: 'black' }}>
            pingutype
          </a>
          <p className="subtext">a typing tool for penguins.</p>
        </div>
      </header>
      <h2 className="description-signup" style={{ marginBottom: 0 }}>
        login or sign-up below
      </h2>
      <p className="username-spot">
        <span style={{ fontSize: '18px' }}>
          Username:
          <textarea className="username-area" rows="1" cols="40" />
        </span>
      </p>
      <p className="password-spot">
        <span style={{ fontSize: '18px' }}>
          Password:
          <textarea className="password-area" rows="1" cols="40" />
        </span>
      </p>
      <div className="signupAndLogin">
        <button className="signup">Sign-up</button>
        <button className="login">Login</button>
      </div>
    </body>
  </html>
  );
}
