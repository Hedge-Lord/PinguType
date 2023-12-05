import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {useCollapse} from 'react-collapsed';
import '../index.css';
import './Settings.css'

function Collapsible() {
    const [theme, setTheme] = useState('light');
    const [isExpanded, setIsExpanded] = useState(true);
    const toggleTheme = (type) => {
       setTheme(type);
       localStorage.setItem('theme', type);
       console.log(localStorage.getItem('theme'))
    };
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme !== null) {
            setTheme(storedTheme);
        }
    }, []);
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded: isExpanded });
    return (
        <body>
            <div className="collapsible">
                <button className="header" {...getToggleProps({ onClick: () => setIsExpanded(!isExpanded) })}>
                    Themes
                </button>
                <div {...getCollapseProps()}>
                    <div className="theme-menu-button">
                        <button onClick={() => toggleTheme('light')} className="theme-button-light">Light: Orange</button>
                        <button onClick={() => toggleTheme('dark')} className="theme-button-dark">Dark: Orange</button>
                        <button onClick={() => toggleTheme('light-blue-accent')} className="theme-button-light-blue-accent">Light: Blue</button>
                        <button onClick={() => toggleTheme('dark-blue-accent')} className="theme-button-dark-blue-accent">Dark: Blue</button>
                        <button onClick={() => toggleTheme('orange')} className="theme-button-orange">Orange</button>
                        <button onClick={() => toggleTheme('dark-panda')} className="theme-button-panda">Panda</button>
                        <button onClick={() => toggleTheme('polar-bear')} className="theme-button-polar-bear">Polar Bear</button>
                        <button onClick={() => toggleTheme('blue')} className="theme-button-blue">Blue</button>
                        <button onClick={() => toggleTheme('red')} className="theme-button-red">Red</button>
                        <button onClick={() => toggleTheme('purple')} className="theme-button-purple">Purple</button>
                        <button onClick={() => toggleTheme('ucla')} className="theme-button-ucla">UCLA</button>
                        <button onClick={() => toggleTheme('chiefs')} className="theme-button-chiefs">Chiefs</button>
                    </div>
                </div>

            </div>
        </body>
        );
}
const SettingsPage = () => {
   
    const handleUpdateUsername = () => {
      // Functionality for updating username
    };
  
    const handleChangePassword = () => {
      // Functionality for changing password
    };
  
    const handleResetSettings = () => {
      // Functionality for resetting settings
    };
  
    const handleDeleteAccount = () => {
      // Functionality for deleting account
    };
  
    return (
      <div className="settings-container">
        
        <div className="settings-card">
          <h2> My Account Settings</h2>
          <div className="sub-heading">Update Username</div>
          <button onClick={handleUpdateUsername}>Update Username</button>
          <div className="sub-heading">Change Password</div>
          <button onClick={handleChangePassword}>Change Password</button>
          <div className="sub-heading">Reset Settings</div>
          <button onClick={handleResetSettings}>Reset Settings</button>
          <div className="sub-heading">Delete Account</div>
          <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </div>
    );
  };
  
function Settings() {
    return (
            <body>
                <h1>Settings</h1>
                <Collapsible />
                <SettingsPage/>
            </body>
          );
}

export default Settings;
