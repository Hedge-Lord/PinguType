import "./App.css"
import logo from './assets/pingutype.png';
import { BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
function NavBar() {
    return (    
    <nav>
        <ul className="list-container">
          <Link to="/" className="top-menu-button">
            ⌂ {/* Unicode character for a home symbol */}
          </Link>
          <Link to="/profile" className="top-menu-button">
            ☺ {/* Unicode character for a crown symbol */}
          </Link>
          <Link to="/leaderboard" className="top-menu-button">
            ♛ {/* Unicode character for a crown symbol */}
          </Link>
          <Link to="/settings" className="top-menu-button">
            ⚙ {/* Unicode character for a gear symbol */}
          </Link>
          <Link to="/feed" className="top-menu-button">
            📰
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