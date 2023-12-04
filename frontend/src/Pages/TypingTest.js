import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import './TypingTest.css';
import "../App.css";
import axios from 'axios';

import generateWords from '../assets/words';
const { normal, hard } = generateWords();

function TypingTest() {
  const [timerStarted, setTimerStarted] = useState(false);
  const [endTime, setEndTime] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [inputHistory, setInputHistory] = useState([]);
  const [update, setUpdate] = useState(null);
  const textInputRef = useRef(null);
  const [currInput, setCurrInput] = useState("");
  const [wpmKeyStrokes, setWpmKeyStrokes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const [enabledDifficulty, setEnabledDifficulty] = useState("normal");
  const [words, setWords] = useState(generateWords().normal);

  useEffect(() => {
    document.getElementById("normal").click();
  }, []);

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  function startTimer() {
    if (!timerStarted)
    {
      setTimerStarted(true);
      var countDown = endTime;
      var timerDisplay = document.getElementById("time");
      var updateInterval = setInterval(function () {
        var now = countDown--;
        setElapsedTime(endTime - countDown);
        timerDisplay.innerHTML = "Time: " + countDown;

        if (countDown <= 0) {
          clearInterval(updateInterval);
          timerDisplay.innerHTML = "Time's up!!!";
        }
      }, 1000);
      setUpdate(updateInterval);
    }
  }

  /////// score submit
  useEffect(() => {
    if (elapsedTime === endTime && !saved) {
      setSaved(true);
      console.log(calculateWpm());
      const [wpm, accuracy] = calculateWpm();
      axios.get("http://localhost:3333/get-user-id", { withCredentials: true })
      .then(res => {
        if (res.data.user_id) {
          axios.post("http://localhost:3333/scores",
          {user_id: res.data.user_id, wpm, accuracy, difficulty: "placeholder"});
        }
        else console.log("Log in to save scores.");
      })
    }
  });

  const [enabledTime, setEnabledTime] = useState("timey30");
  function handleTimeClick(time) {
    handleReset();

    document.getElementById(enabledTime).classList.toggle("button-clicked");
    document.getElementById(time).classList.toggle("button-clicked");
    setEnabledTime(time);
  }

  function handleClick(id) {
    document.getElementById(id).classList.toggle("button-clicked");
  }

  const handleKeyDown = (e) => {
    if (elapsedTime === endTime) return;

    const keyCode = e.keyCode;
    if (keyCode < 32 && keyCode !== 8) return; // non printable char
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
      if (inputHistory.at(i) === words[i]) {
        correctCpm += words.at(i).length + 1;
      }
    }
    return [Math.floor((correctCpm / 5 / (elapsedTime)) * 60.0), (correctCpm / (wpmKeyStrokes - currInput.length) * 100).toFixed(2)];
  }

  function focusTypeBox() {
    textInputRef.current && textInputRef.current.focus();
  }

  const handleReset = () => {
    setTimerStarted(false);
    setElapsedTime(0);
    setInputHistory([]);
    setCurrInput("");
    setWpmKeyStrokes(0);
    setWpm(0);
    setCurrentIndex(0);
    setCurrentCharIndex(0);
    textInputRef.current.value = "";

    if (update) {
      clearInterval(update);
      setUpdate(null);
    }

    const selectedWords = enabledDifficulty === "hard" ? generateWords().hard : generateWords().normal;
    setWords(selectedWords);

    document.getElementById("time").innerHTML = "Start typing to start the timer";

  };

  const handleDifficultyClick = (difficulty) => {
    
    handleReset();
    
    document.getElementById(enabledDifficulty).classList.remove("button-clicked");
    document.getElementById(difficulty).classList.add("button-clicked");
    setEnabledDifficulty(difficulty);

    const selectedWords = difficulty === "hard" ? generateWords().hard : generateWords().normal;
    setWords(selectedWords);

  };

return (
    <div onClick={focusTypeBox}>
        <div className="options">
            <button id="normal" onClick={() => handleDifficultyClick("normal")}> Normal </button>
            <button id="hard" onClick={() => handleDifficultyClick("hard")}> Hard </button>
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
            <button id ="reset-button" onClick={handleReset}>
              ⟳ {/* Unicode character for a home symbol */}
            </button>
        </div>
    </div>);
}

export default TypingTest;