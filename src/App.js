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
        <Link to="/"><button>Home</button></Link>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/profile"><button>Profile</button></Link>
        <Link to="/leaderboard"><button>Leaderboard</button></Link>
        <Link to="/settings"><button>Settings</button></Link>
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