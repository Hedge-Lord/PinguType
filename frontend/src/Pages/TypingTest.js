import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import './TypingTest.css';
import "../App.css";
import axios from 'axios';
const words = require('../assets/words');


function TypingTest() {

  const [enabledTime, setEnabledTime] = useState("timey30");
  function handleTimeClick(time) {
    document.getElementById(enabledTime).classList.toggle("button-clicked");
    document.getElementById(time).classList.toggle("button-clicked");
    setEnabledTime(time);
  }

  function handleClick(id) {
    document.getElementById(id).classList.toggle("button-clicked");
  }

  const textInputRef = useRef(null);

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  const [currInput, setCurrInput] = useState("");
  const [wpmKeyStrokes, setWpmKeyStrokes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const handleKeyDown = (e) => {
    if (elapsedTime === endTime) return;

    const keyCode = e.keyCode;
    if (wpmKeyStrokes !== 0 && elapsedTime > 0) {
      setWpm(Math.floor((wpmKeyStrokes / 5 / (elapsedTime)) * 60.0));
    }

    // space bar
    if (keyCode === 32) {
      setCurrentCharIndex(0);
      setCurrentIndex(currentIndex + 1);
      setInputHistory([...inputHistory, currInput.trim()]);
      setCurrInput("");
      setWpmKeyStrokes(wpmKeyStrokes + 1);
    } else if (keyCode !== 8) {
      setWpmKeyStrokes(wpmKeyStrokes + 1);
      setCurrentCharIndex(currentCharIndex + 1);
    }

    if (keyCode === 8) {
      if (currentCharIndex > 0) {
        setWpmKeyStrokes(wpmKeyStrokes - 1);
        setCurrentCharIndex(currentCharIndex - 1);
      } 
      else if (currentCharIndex === 0 && currentIndex > 0) {
        setWpmKeyStrokes(wpmKeyStrokes - 1);
        setCurrentIndex(currentIndex - 1);
        let lastInput = inputHistory.pop();
        setCurrentCharIndex(lastInput.length);
        setCurrInput(lastInput + lastInput.charAt(lastInput.length - 1));
      }
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  function getCharClass(char, i, i_curr, idx, idx_curr) {
    if (i < i_curr) {
      if (inputHistory[i].charAt(idx) === char) return "correct";
      else return "incorrect";
    } else if (i === i_curr) {
      if (idx === idx_curr - 1) {
        if (currInput.charAt(idx) === char) return "correct caret"
        else return "incorrect caret"
      } 
      else if (idx < idx_curr) {
        if (currInput.charAt(idx) === char) return "correct";
        else return "incorrect";
      } else if (idx_curr === 0 && idx === 0) return "left-caret";
    }
    return "";
  }

  function calculateWpm() {
    if (elapsedTime === 0) return 0;
    let correctCpm = 0;
    for (let i = 0; i < inputHistory.length; i++) {
      if (inputHistory.at(i) === words.at(i)) {
        correctCpm += words.at(i).length;
      }
      correctCpm++;
    }
    let correctWpm = Math.floor((correctCpm / 5 / (elapsedTime)) * 60.0)
    let userAccuracy = (correctCpm / (wpmKeyStrokes - currInput.length) * 100).toFixed(2)
    return [correctWpm, userAccuracy];
  }

  const [timerStarted, setTimerStarted] = useState(false);
  const [endTime, setEndTime] = useState(30);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [inputHistory, setInputHistory] = useState([]);

  function startTimer() {
    if (!timerStarted)
    {
      setTimerStarted(true);
      var countDown = endTime;
      var timerDisplay = document.getElementById("time");
      var update = setInterval(function () {
        setElapsedTime(endTime - countDown);
        timerDisplay.innerHTML = "Time: " + countDown;
        countDown--;
        
        if (countDown === 0) {
          clearInterval(update);
          timerDisplay.innerHTML = "Time's up!!!";
          let hasRun = true;
          if (hasRun)
          {
            axios.post('http://localhost:3333/userscores', {username: "swagciety", wpm: wpm, acc: 100, date: new Date(), difficulty: "easy"})
            .then(result=>{console.log(result)
            })
            .catch(err => console.log(err));
            hasRun = false;
          }

        }
      }, 1000);
    }
  }

  function focusTypeBox() {
    textInputRef.current && textInputRef.current.focus();
  }

return (
    <div onClick={focusTypeBox}>
        <div className="options">
            <button id="puncy" onClick={() => handleClick("puncy")}> Punctuation </button>
            <button class = "center" id="numby" onClick={() => handleClick("numby")}> Numbers </button>
            <button id="timey15" onClick={() => {handleTimeClick("timey15"); setEndTime(15)}}> 15s </button>
            <button id="timey30" className="button-clicked" onClick={() => {handleTimeClick("timey30"); setEndTime(30)}}> 30s </button>
            <button id="timey60" onClick={() => {handleTimeClick("timey60"); setEndTime(60)}}> 60s</button>
        </div>
        <div id="typing-test">
            <label htmlFor="typing-area">
              Type away! PinguType is a WIP. Typing accuracy has not yet been implemented.
            </label>
            <div id="timerDisplay">
            <h3 id="time">Start typing to start the timer</h3>
            </div>
            <div id="typing-area">
              {words.map((word, i) => (
                <span
                  key={i}
                  >
                  {word.split("").map((char, idx) => (
                    <span
                      key={"word" + idx}
                      className={getCharClass(char, i, currentIndex, idx, currentCharIndex)}
                    >
                      {char}
                    </span>
                  ))}
                  <span> {" "} </span>
                </span>
              ))}
            </div>
            <span className='wpm-counter'>
              WPM: {wpm}
            </span>
            <span className='wpm-counter'>
              Corrected WPM: {calculateWpm()[0]}
            </span>
            <span className='wpm-counter'>
              Accuracy: {calculateWpm()[1]}%
            </span>
            <input 
              ref={textInputRef}
              className='hidden-input'
              type='text'
              value={currInput}
              onChange={(e) => {if (elapsedTime !== endTime) setCurrInput(e.target.value.trim().trim()); startTimer();}}
              onKeyDown={handleKeyDown}
              id='hidden-input'
              autocomplete='off'
            />
        </div>
    </div>);
}

export default TypingTest;