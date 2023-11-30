import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {useCollapse} from 'react-collapsed';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'use-local-storage'
import '../index.css';
import './Settings.css'

function Collapsible() {
    const [theme, setTheme] = useState("light");

    const toggleTheme = (type) => {
       setTheme(type);
    };
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
    const { getCollapseProps, getToggleProps} = useCollapse();
    return (
        <body>
            <div className="collapsible">
                <button className="header" {...getToggleProps()}>
                    Themes
                </button>
                <div {...getCollapseProps()}>
                    <div className="theme-menu-button">
                        <button onClick={() => toggleTheme('light')} className="theme-button-light">Light: Orange</button>
                        <button onClick={() => toggleTheme('dark')} className="theme-button-dark">Dark: Orange</button>
                        <button onClick={() => toggleTheme('dark-blue-accent')} className="theme-button-dark-blue-accent">Dark: Blue</button>
                        <button onClick={() => toggleTheme('light-blue-accent')} className="theme-button-light-blue-accent">Light: Blue</button>
                        <button onClick={() => toggleTheme('dark-panda')} className="theme-button-dark-panda">Panda</button>
                        <button onClick={() => toggleTheme('reverse-panda')} className="theme-button-reverse-panda">Reverse Panda</button>
                        <button onClick={() => toggleTheme('red')} className="theme-button-red">Red</button>
                        <button onClick={() => toggleTheme('orange')} className="theme-button-orange">Orange</button>
                        <button onClick={() => toggleTheme('blue')} className="theme-button-blue">Blue</button>
                    </div>
                </div>

            </div>
        </body>
        );
}
function Settings() {
    const [theme, setTheme] = useState('light')
    const toggleTheme = (type) => {
        setTheme(type)
    };
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
    return (
            <body>
                <h1>Settings</h1>
                <Collapsible />
            </body>
          );
}
  
  export default Settings;