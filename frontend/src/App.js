import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import TypingTest from "./Pages/TypingTest";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile"
import Leaderboard from "./Pages/Leaderboard";
import Settings from "./Pages/Settings"
import Header from "./Header"
import {useEffect} from 'react'
import {useState} from 'react'
import "./App.css"

function App() {
  const storedValue = localStorage.getItem('stuff');
  const [theme, setTheme] = useState(storedValue);
  const main = localStorage.getItem('accent2');
  const accent = localStorage.getItem('accent1');
  const text = localStorage.getItem('text');
  const correct = localStorage.getItem('correct');
  const incorrect = localStorage.getItem('incorrect');
  const underlaying = localStorage.getItem('underlay');
  const background = localStorage.getItem('background');
  const border = localStorage.getItem('border');
  const button = localStorage.getItem('button');
  console.log('theme: ', theme);
  useEffect(() => {
    if (theme === 'custom') {
      console.log(document.body.style.setProperty('--main-color', main));
      document.body.style.setProperty('--accent-color', accent);
      document.body.style.setProperty('--text-color', text);
      document.body.style.setProperty('--correct-color', correct);
      document.body.style.setProperty('--incorrect-color', incorrect);
      document.body.style.setProperty('--underlaying-text-color', underlaying);
      document.body.style.setProperty('--border-color', border);
      document.body.style.setProperty('--whole-page-background-color', background);
      document.body.style.setProperty('--background-color', background);
      document.body.style.setProperty('--button-color', button);
      document.body.style.setProperty('background-color', 'var(--whole-page-background-color');
      document.body.style.setProperty('color', 'var(--text-color');
    } else {
      document.body.className = theme;
    }
  }, [theme]);
  return (
    <>
      <Header />
      <Routing />
    </>
  );
}

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<TypingTest />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}

export default App;