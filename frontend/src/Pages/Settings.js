import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {useCollapse} from 'react-collapsed';
import '../index.css';
import './Settings.css'

function Collapsible() {
    const [theme, setTheme] = useState('light');
    
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

function logout() {
    return;
}

// function Settings() {
//       const [currentStyle, setCurrentStyle] = useState(themes[0].style);

//       const changeStyle = (style) => {
//         setCurrentStyle(style);
//         localStorage.setItem('currentStyle', style);
//       };
    
//       useEffect(() => {
//         const storedStyle = localStorage.getItem('currentStyle');
//         if (storedStyle !== null) {
//           setCurrentStyle(storedStyle);
//         }
//       }, []);
//       const { getCollapseProps, getToggleProps} = useCollapse();
//       return (
//         <div>
//         <body>
//         <h1>Settings</h1>
//         <div className="collapsible">
//             <button className="header" {...getToggleProps()}>
//                     Themes
//             </button>
//           <div className="theme-menu-button" {...getCollapseProps()}>
//             {themes.map((theme, index) => (
//               <button key={index} onClick={() => changeStyle(theme.style)} className={theme.classThingy}>
//                 {theme.name}
//               </button>
//             ))}
//           </div>
//         </div>
//         <button onClick={() => logout()} className='logout-button'>Logout</button>
//         </body>
//         <style>
//             {currentStyle}
//         </style>
//         </div>
//     );
// }

function Settings() {
    return (
            <body>
                <h1>Settings</h1>
                <Collapsible />
                <button onClick={() => logout()} className='logout-button'>Logout</button>
            </body>
          );
}
  
  export default Settings;