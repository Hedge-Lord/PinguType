import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile"
import Leaderboard from "./Pages/Leaderboard";
import Settings from "./Pages/Settings"
import Header from "./Header"
import "./App.css"


function App() {
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
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}

export default App;