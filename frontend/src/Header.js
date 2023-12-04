import "./App.css"
import logo from './assets/pingutype.png';
import { BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import {useState} from 'react'
import {useEffect} from 'react'
import Settings from './Pages/Settings'
function NavBar() {
    return (    
    <nav>
        <ul className="list-container">
          <Link to="/">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Home_icon_orange.png" alt="TypingTest" className="image-button" />
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
      
      );
}

export default function Header() {
    return (
    <>
        <div className="constant-header">
        <header>
          <Link className="logo-link" to="/"><img src={logo} id="logo" alt="PinguType Logo" /></Link>
          <div className="title">
            <Link to="/" className="pingutype-header">
              pingutype
            </Link>
            <p className="subtext">a typing tool for penguins.</p>
          </div>
        </header>
      </div>  
      <NavBar />
    </>
    );
}