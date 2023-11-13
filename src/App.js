import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile"
import "./App.css"
import logo from './assets/pingutype.png';

function App() {
  return (
    <>
    <nav>
      <ul className="list-container">
        <Link to="/"><button>Home</button></Link>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/profile" imageUrl = 'https://media.istockphoto.com/id/1351147752/photo/studio-portrait-of-attractive-20-year-old-bearded-man.jpg?s=612x612&w=0&k=20&c=-twL1NKKad6S_EPrGSniewjh6776A0Ju27ExMh7v_kI='><button>Profile</button></Link>
      </ul>
    </nav>
    <header>
          <img src={logo} id="logo" alt="PinguType Logo" />
          <div className="title">
            <a href="index.html" style={{ textDecoration: 'none', color: 'black' }}>
              pingutype
            </a>
            <p className="subtext">a typing tool for penguins.</p>
          </div>
        </header>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </>
  );
}

export default App;