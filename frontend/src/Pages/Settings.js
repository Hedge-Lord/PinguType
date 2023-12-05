import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {useCollapse} from 'react-collapsed';
import '../index.css';
import './Settings.css'

function Collapsible() {
    const [background, setBackground] = useState('');
    const [accent1, setAccent1] = useState('');
    const [accent2, setAccent2] = useState('');
    const [text, setText] = useState('');
    const [correct, setCorrect] = useState('');
    const [incorrect, setIncorrect] = useState('');
    const [underlay, setUnderlay] = useState('');
    const [border, setBorder] = useState('');
    const [button, setButton] = useState('');

    const [theme, setTheme] = useState({
        mainColor: '',
        accentColor: '',
        textColor: '',
        correctColor: '',
        incorrectColor: '',
        underlayingTextColor: '',
        borderColor: '',
        wholePageBackgroundColor: '',
        backgroundColor: '',
        buttonColor: ''}
    );
    const toggleTheme = (type) => {
       setTheme(type);
       localStorage.setItem('theme', type);
       console.log(localStorage.getItem('theme'))
    };
    function handleChange() {
        const customTheme = {
            mainColor: accent2,
            accentColor: accent1,
            textColor: text,
            correctColor: correct,
            incorrectColor: incorrect,
            underlayingTextColor: underlay,
            borderColor: border,
            wholePageBackgroundColor: background,
            backgroundColor: background,
            buttonColor: button
        };
        console.log(theme.wholePageBackgroundColor);
        setTheme(customTheme);
        localStorage.setItem('theme', customTheme);
    }
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme !== null) {
            setTheme(storedTheme);
        }
    }, []);
    useEffect(() => {
        // document.body.className = theme;
        //if () {}
        document.body.style.setProperty('--main-color', theme.mainColor);
        document.body.style.setProperty('--accent-color', theme.accentColor);
        document.body.style.setProperty('--text-color', theme.textColor);
        document.body.style.setProperty('--correct-color', theme.correctColor);
        document.body.style.setProperty('--incorrect-color', theme.incorrectColor);
        document.body.style.setProperty('--underlaying-text-color', theme.underlayingTextColor);
        document.body.style.setProperty('--border-color', theme.borderColor);
        document.body.style.setProperty('--whole-page-background-color', theme.wholePageBackgroundColor);
        document.body.style.setProperty('--background-color', theme.backgroundColor);
        document.body.style.setProperty('--button-color', theme.buttonColor);
    }, [theme]);
    // {...getToggleProps({ onClick: () => setIsExpanded(!isExpanded) })
    const [isExpanded, setIsExpanded] = useState(true);
    const { getCollapseProps: getCollapseProps1, getToggleProps: getToggleProps1 } = useCollapse({ isExpanded: isExpanded });
    const { getCollapseProps: getCollapseProps2, getToggleProps: getToggleProps2 } = useCollapse();
    return (
        <body>
            <div className="collapsible">
                <button className="header" {...getToggleProps1({ onClick: () => setIsExpanded(!isExpanded) })}>
                    Themes
                </button>
                <div {...getCollapseProps1()}>
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
                        <button onClick={() => toggleTheme('pink')} className="theme-button-pink">Pink</button>
                        <button onClick={() => toggleTheme('puke')} className="theme-button-puke">Shrek</button>
                        <button onClick={() => toggleTheme('terminal')} className="theme-button-terminal">Terminal</button>
                        <button onClick={() => toggleTheme('chatgpt')} className="theme-button-chatgpt">ChatGPT</button>
                        <button onClick={() => toggleTheme('watermelon')} className="theme-button-watermelon">Watermelon</button>
                        <button onClick={() => toggleTheme('dark-purple')} className="theme-button-dark-purple">Dark: Purple</button>
                        <button onClick={() => toggleTheme('newtheme3')} className="theme-button-newtheme3">Newtheme3</button>
                        <button onClick={() => toggleTheme('blind-simulation')} className="theme-button-blind-simulation">Blind Simulation</button>
                    </div>
                </div>
            </div>
            <div className="collapsible" style={{marginTop: '1vh'}}>
            <button className="header" {...getToggleProps2({ onClick: () => setIsExpanded(!isExpanded) })}>
                Custom Theme
            </button>
                <div {...getCollapseProps2()} className="custom-theme-menu-button">
                    <div>
                        <p>Background</p>
                        <input className="custom-theme-button" placeholder="#000000" onChange={(reg) => setBackground(reg.target.value)}></input>
                    </div>
                    <div>
                        <p>Accent Color 1</p>
                        <input className="custom-theme-button" placeholder="#000000" onChange={(reg) => setAccent1(reg.target.value)}></input>
                    </div>
                    <div>
                        <p>Accent Color 2</p>
                        <input className="custom-theme-button" placeholder="#000000" onChange={(reg) => setAccent2(reg.target.value)}></input>
                    </div>
                    <div>
                        <p>Text Color</p>
                        <input className="custom-theme-button" placeholder="#000000" onChange={(reg) => setText(reg.target.value)}></input>
                    </div>
                    <div>
                        <p>Correct Color</p>
                        <input className="custom-theme-button" placeholder="#000000" onChange={(reg) => setCorrect(reg.target.value)}></input>
                    </div>
                    <div>
                        <p>Incorrect Color</p>
                        <input className="custom-theme-button" placeholder="#000000" onChange={(reg) => setIncorrect(reg.target.value)}></input>
                    </div>
                    <div>
                        <p>Underlay Color</p>
                        <input className="custom-theme-button" placeholder="#000000" onChange={(reg) => setUnderlay(reg.target.value)} />
                    </div>
                    <div>
                        <p>Border Color</p>
                        <input className="custom-theme-button" placeholder="#000000" onChange={(reg) => setBorder(reg.target.value)}></input>
                    </div>
                    <div>
                        <p>Button Color</p>
                        <input className="custom-theme-button" placeholder="#000000" onChange={(reg) => setButton(reg.target.value)}></input>
                    </div>
                    <div></div>
                    <div>
                        <button className="custom-theme-change" style={{marginTop: '1vh'}} onClick={() => handleChange()}>Change!</button>
                    </div>
                </div>
            </div>
        </body>
        );
}

function Settings() {
    return (
            <body>
                <h1>Settings</h1>
                <Collapsible />
            </body>
          );
}

export default Settings;
