import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile"
import Leaderboard from "./Pages/Leaderboard";
import Settings from "./Pages/Settings"
import "./App.css"
import logo from './assets/pingutype.png';


function App() {
  return (
    <>
    <nav>
      <ul className="list-container">
        <Link to="/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Home_icon_orange.png" alt="Home" className="image-button" />
        </Link>
        <Link to="/login">
            <img src="https://cdn-icons-png.flaticon.com/512/2996/2996170.png" alt="Login" className="image-button" />
        </Link>
        <Link to="/profile">
            <img src="https://cdn3.iconfinder.com/data/icons/flatastic-4-1/256/user_orange-512.png" alt="Profile" className="image-button" />
        </Link>
        <Link to="/leaderboard">
            <img src="https://icon-library.com/images/leaderboard-icon/leaderboard-icon-0.jpg" alt="Leaderboard" className="image-button" />
        </Link>
        <Link to="/settings">
            <img src="https://icones.pro/wp-content/uploads/2021/03/icone-de-configuration-orange.png" alt="Settings" className="image-button" />
        </Link>
      </ul>
    </nav>
    <div className="constant-header">
      <header>
        <a className="logo-link" href="/"><img src={logo} id="logo" alt="PinguType Logo" /></a>
        <div className="title">
          <a href="/" style={{ textDecoration: 'none', color: 'black' }}>
            pingutype
          </a>
          <p className="subtext">a typing tool for penguins.</p>
        </div>
      </header>
    </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
    </>
  );
}

export default App;