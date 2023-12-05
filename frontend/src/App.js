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
    document.body.className = theme;
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