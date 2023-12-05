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
  const storedValue = localStorage.getItem('theme');
  const [theme, setTheme] = useState(storedValue);
  useEffect(() => {
    document.body.style.setProperty('--main-color', theme.mainColor);
    document.body.style.setProperty('--accent-color', theme.accentColor);
    document.body.style.setProperty('--text-color', theme.textColor);
    document.body.style.setProperty('--correct-color', theme.correctColor);
    document.body.style.setProperty('--incorrect-color', theme.incorrectColor);
    document.body.style.setProperty('--underlaying-text-color', theme.underlayingTextColor);
    document.body.style.setProperty('--border-color', theme.borderColor);
    document.body.style.setProperty('--whole-page-background-color', theme.wholePageBackgroundColor);
    document.body.style.setProperty('--background-color', theme.backgroundColor);
    document.body.style.setProperty('--button-color', theme.buttonColor);
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