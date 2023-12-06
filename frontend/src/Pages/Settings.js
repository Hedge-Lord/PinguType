import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {useCollapse} from 'react-collapsed';
import '../index.css';
import './Settings.css'
  

function Collapsible() {
    const [background, setBackground] = useState(() => {
        const thing = localStorage.getItem('background');
        return (
            thing ? thing : '#48494b')});
    const [accent1, setAccent1] = useState(() => {
        const thing = localStorage.getItem('accent1');
        return (
        thing ? thing : 'white')});
    const [accent2, setAccent2] = useState(() => {
        const thing = localStorage.getItem('accent2');
        return (
        thing ? thing : '#828282')});
    const [text, setText] = useState(() => {
        const thing = localStorage.getItem('text');
        return (
        thing ? thing : 'lightblue')});
    const [correct, setCorrect] = useState(() => {
        const thing = localStorage.getItem('correct');
        return (
        thing ? thing : 'lightblue')});
    const [incorrect, setIncorrect] = useState(() => {
        const thing = localStorage.getItem('incorrect');
        return (
        thing ? thing : 'red')});
    const [underlay, setUnderlay] = useState(() => {
        const thing = localStorage.getItem('underlay');
        return (
        thing ? thing : 'lightgray')});
    const [border, setBorder] = useState(() => {
        const thing = localStorage.getItem('border');
        return (
        thing ? thing : 'white')});
    const [button, setButton] = useState(() => {
        const thing = localStorage.getItem('button');
        return (
        thing ? thing : '#828282')});
    const [rerenderCustom, setRerenderCustom] = useState(false);
    const [theme, setTheme] = useState(() => {
        const thing = localStorage.getItem('theme');
        return (
            thing ? thing : ''
        )}
    );

    const predefinedThemes = {
        light: {
            '--main-color': '#ffe5b4',
            '--accent-color': '#ef820d',
            '--text-color': 'black',
            '--correct-color': 'black',
            '--incorrect-color': '#ef820d',
            '--underlaying-text-color': 'gray',
            '--border-color': 'black',
            '--whole-page-background-color': 'white',
            '--background-color': 'white',
            '--button-color': 'lightgrey',
            'background-color': 'var(--whole-page-background-color)',
            'color': 'var(--text-color)',
          },
          dark: {
            '--main-color': 'darkgrey',
            '--accent-color': '#ef820d',
            '--text-color': 'white',
            '--correct-color': 'white',
            '--incorrect-color': 'red',
            '--underlaying-text-color': 'lightgray',
            '--border-color': 'white',
            '--whole-page-background-color': '#48494b',
            '--background-color': '#48494b',
            '--button-color': '#828282',
            'background-color': 'var(--whole-page-background-color)',
            'color': 'var(--text-color)',
          },
          'dark-blue-accent': {
            '--main-color': '#828282',
            '--accent-color': 'white',
            '--text-color': 'lightblue',
            '--correct-color': 'lightblue',
            '--incorrect-color': 'red',
            '--underlaying-text-color': 'lightgray',
            '--border-color': 'white',
            '--whole-page-background-color': '#48494b',
            '--background-color': '#48494b',
            '--button-color': '#828282',
            'background-color': 'var(--whole-page-background-color)',
            'color': 'var(--text-color)',
          },
          'light-blue-accent': {
            '--main-color': 'white',
            '--accent-color': '#598baf',
            '--text-color': 'black',
            '--correct-color': 'black',
            '--incorrect-color': 'red',
            '--underlaying-text-color': 'gray',
            '--border-color': 'black',
            '--whole-page-background-color': 'white',
            '--background-color': 'white',
            '--button-color': 'lightgrey',
            'background-color': 'var(--whole-page-background-color)',
            'color': 'var(--text-color)',
          },
          'dark-panda': {
            '--main-color': 'black',
            '--accent-color': 'white',
            '--text-color': 'white',
            '--correct-color': 'white',
            '--incorrect-color': 'red',
            '--underlaying-text-color': 'grey',
            '--border-color': 'white',
            '--whole-page-background-color': 'black',
            '--background-color': 'black',
            '--button-color': '#191919',
            'background-color': 'var(--whole-page-background-color)',
            'color': 'var(--text-color)',
          },
          'polar-bear': {
            '--main-color': 'white',
            '--accent-color': 'black',
            '--text-color': 'black',
            '--correct-color': 'black',
            '--incorrect-color': 'red',
            '--underlaying-text-color': 'lightgray',
            '--border-color': 'black',
            '--whole-page-background-color': 'white',
            '--background-color': 'white',
            '--button-color': '#f8f8ff',
            'background-color': 'var(--whole-page-background-color)',
            'color': 'var(--text-color)',
          },
          'orange': {
            '--main-color': 'white',
            '--accent-color': '#b64000',
            '--text-color': 'black',
            '--correct-color': 'white',
            '--incorrect-color': 'red',
            '--underlaying-text-color': '#b64000',
            '--border-color': '#8b4000',
            '--whole-page-background-color': '#fda172',
            '--background-color': '#fda172',
            '--button-color': '#ff964f',
            'background-color': 'var(--whole-page-background-color)',
            'color': 'var(--text-color)',
          },
          blue: {
            '--main-color': 'white',
            '--accent-color': 'white',
            '--text-color': '#006884',
            '--correct-color': 'white',
            '--incorrect-color': 'red',
            '--underlaying-text-color': '#006884',
            '--border-color': 'black',
            '--whole-page-background-color': '#a9c7ee',
            '--background-color': '#a9c7ee',
            '--button-color': '#afdae0',
            'background-color': 'var(--whole-page-background-color)',
            'color': 'var(--text-color)',
          },
          red: {
            '--main-color': '#d30000',
            '--accent-color': '#d30000',
            '--text-color': 'white',
            '--correct-color': '#d30000',
            '--incorrect-color': 'black',
            '--underlaying-text-color': 'white',
            '--border-color': 'black',
            '--whole-page-background-color': '#ee6b6e',
            '--background-color': '#ee6b6e',
            '--button-color': '#7c0a03',
            'background-color': 'var(--whole-page-background-color)',
            'color': 'var(--text-color)',
          },
          purple: {
            '--main-color': 'white',
            '--accent-color': 'white',
            '--text-color': '#8968cd',
            '--correct-color': '#371f76',
            '--incorrect-color': 'red',
            '--underlaying-text-color': 'white',
            '--border-color': '#371f76',
            '--whole-page-background-color': '#cea2fd',
            '--background-color': '#cea2fd',
            '--button-color': 'white',
            'background-color': 'var(--whole-page-background-color)',
            'color': 'var(--text-color)',
          },
          ucla: {
            '--main-color': '#89cfef',
            '--accent-color': '#89cfef',
            '--text-color': 'yellow',
            '--correct-color': 'yellow',
            '--incorrect-color': 'red',
            '--underlaying-text-color': '#89cfef',
            '--border-color': 'black',
            '--whole-page-background-color': '#0f52ba',
            '--background-color': '#0f52ba',
            '--button-color': '#89cfef',
            'background-color': 'var(--whole-page-background-color)',
            'color': 'var(--text-color)',
          },
          chiefs: {
            '--main-color': 'black',
            '--accent-color': 'white',
            '--text-color': 'yellow',
            '--correct-color': 'yellow',
            '--incorrect-color': 'lightgrey',
            '--underlaying-text-color': 'black',
            '--border-color': 'black',
            '--whole-page-background-color': '#d30000',
            '--background-color': '#d30000',
            '--button-color': 'black',
            'background-color': 'var(--whole-page-background-color)',
            'color': 'var(--text-color)',
          },
          pink: {
            '--main-color': '#ff69b4',
            '--accent-color': '#ff69b4',
            '--text-color': 'white',
            '--correct-color': '#ff69b4',
            '--incorrect-color': 'black',
            '--underlaying-text-color': 'white',
            '--border-color': 'black',
            '--whole-page-background-color': 'pink',
            '--background-color': '#ffc0cb',
            '--button-color': '#ff69b4',
            'background-color': 'var(--whole-page-background-color)',
            'color': 'var(--text-color)',
           },
            puke: {
            '--main-color': '#e5d3b3',
            '--accent-color': '#ccff66',
            '--text-color': '#7b3f00',
            '--correct-color': '#7b3f00',
            '--incorrect-color': 'red',
            '--underlaying-text-color': 'grey',
            '--border-color': 'black',
            '--whole-page-background-color': '#a3cc52',
            '--background-color': '#a3cc52',
            '--button-color': '#3d550c',
            'background-color': 'var(--whole-page-background-color)',
            'color': 'var(--text-color)',
            },
            terminal: {
                '--main-color': '#2e2e2e',
                '--accent-color': '#00ff00',
                '--text-color': 'white',
                '--correct-color': '#00ff00',
                '--incorrect-color': 'red',
                '--underlaying-text-color': 'white',
                '--border-color': 'black',
                '--whole-page-background-color': '#111111',
                '--background-color': '#111111',
                '--button-color': '#2e2e2e',
                'background-color': 'var(--whole-page-background-color)',
                'color': 'var(--text-color)',
              },
              chatgpt: {
                '--main-color': 'grey',
                '--accent-color': 'white',
                '--text-color': '#ffcc33',
                '--correct-color': '#ffcc33',
                '--incorrect-color': 'red',
                '--underlaying-text-color': 'grey',
                '--border-color': 'black',
                '--whole-page-background-color': 'darkgrey',
                '--background-color': 'darkgrey',
                '--button-color': 'grey',
                'background-color': 'var(--whole-page-background-color)',
                'color': 'var(--text-color)',
              },
              watermelon: {
                '--main-color': 'rgb(238, 200, 225)',
                '--accent-color': 'rgb(239, 223, 226)',
                '--text-color': '#ff3377ea',
                '--correct-color': '#ff3377ac',
                '--incorrect-color': 'red',
                '--underlaying-text-color': '#ff33775d',
                '--border-color': 'black',
                '--whole-page-background-color': 'rgba(0, 128, 0, 0.444)',
                '--background-color': 'rgb(68, 169, 68)',
                '--button-color': 'rgb(248, 207, 214)',
                'background-color': 'var(--whole-page-background-color)',
                'color': 'var(--text-color)',
              },
              'slot-machine': {
                '--main-color': '#F08080',
                '--accent-color': '#4682B4',
                '--text-color': '#32CD32',
                '--correct-color': '#FFD700',
                '--incorrect-color': '#8A2BE2',
                '--underlaying-text-color': '#FF6347',
                '--border-color': '#00FFFF',
                '--whole-page-background-color': '#800080',
                '--background-color': '#800080',
                '--button-color': '#FFA07A',
                'background-color': 'var(--whole-page-background-color)',
                'color': 'var(--text-color)',
              },
              'white': {
                '--main-color': 'white',
                '--accent-color': 'white',
                '--text-color': 'white',
                '--correct-color': 'white',
                '--incorrect-color': 'white',
                '--underlaying-text-color': 'white',
                '--border-color': 'white',
                '--whole-page-background-color': 'white',
                '--background-color': 'white',
                '--button-color': 'white',
                'background-color': 'var(--whole-page-background-color)',
                'color': 'var(--text-color)',
              },
              'dark-purple': {
                '--main-color': 'black',
                '--accent-color': 'white',
                '--text-color': '#b026ff',
                '--correct-color': 'white',
                '--incorrect-color': '#800020',
                '--underlaying-text-color': '#b026ff',
                '--border-color': 'black',
                '--whole-page-background-color': 'black',
                '--background-color': 'black',
                '--button-color': 'white',
                'background-color': 'var(--whole-page-background-color)',
                'color': 'var(--text-color)',
              },
              'pastel': {
                '--main-color': '#CBF8DA',
                '--accent-color': 'white',
                '--text-color': '#E3BDF4',
                '--correct-color': 'white',
                '--incorrect-color': '#800020',
                '--underlaying-text-color': '#b026ff',
                '--border-color': '#CBF8DA',
                '--whole-page-background-color': '#CBF8DA',
                '--background-color': '#CBF8DA',
                '--button-color': 'white',
                'background-color': 'var(--whole-page-background-color)',
                'color': 'var(--text-color)',
              },
          custom: {
            '--main-color': accent2,
            '--accent-color': accent1,
            '--text-color': text,
            '--correct-color': correct,
            '--incorrect-color': incorrect,
            '--underlaying-text-color': underlay,
            '--border-color': border,
            '--whole-page-background-color': background,
            '--background-color': background,
            '--button-color': button,
            'background-color': 'var(--whole-page-background-color)',
            'color': 'var(--text-color)',
          }
    };

    const predefinedThemesJSON = JSON.stringify(predefinedThemes);

    const toggleTheme = (type) => {
        setTheme(type);
        localStorage.setItem('stuff', type);
        console.log(type);
    };

    const toggleCustomTheme = () => {
        setTheme('custom');
        localStorage.setItem('theme', 'custom');
        localStorage.setItem('stuff', 'custom');
        console.log(localStorage.getItem('theme'));
    }
    useEffect(() => {
        setTheme(predefinedThemes['custom']);
    }, [accent1, accent2, text, background, correct, incorrect, underlay, border, button])
    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(predefinedThemes));
        const parsedThemes = JSON.parse(predefinedThemesJSON);
        const selectedTheme = parsedThemes[theme]
        localStorage.setItem('key', theme);
        if (selectedTheme) {
            Object.keys(selectedTheme).forEach((key) => {
            document.body.style.setProperty(key, selectedTheme[key]);
            });
        }
    }, [theme]);
    const [isExpanded, setIsExpanded] = useState(true);
    const { getCollapseProps: getCollapseProps1, getToggleProps: getToggleProps1 } = useCollapse({ isExpanded: isExpanded });
    const { getCollapseProps: getCollapseProps2, getToggleProps: getToggleProps2 } = useCollapse();
    // <button onClick={() => toggleTheme('pastel')} className="theme-button-pastel">Pastel</button>
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
                        <button onClick={() => toggleTheme('slot-machine')} className="theme-button-slot-machine">Slot Machine</button>
                        <button onClick={() => toggleTheme('white')} className="theme-button-white">White</button>
                        

                    </div>
                </div>
            </div>
            <div className="collapsible" style={{marginTop: '1vh'}}>
            <button className="header" {...getToggleProps2({ onClick: () => setIsExpanded(isExpanded ? !isExpanded : isExpanded) })}>
                Custom Theme
            </button>
                <div {...getCollapseProps2()} className="custom-theme-menu-button">
                    <div>
                        <p>Background</p>
                        <input className="custom-theme-button" placeholder={`${background}`} onChange={(reg) => {setBackground(reg.target.value); localStorage.setItem('background', reg.target.value)}}></input>
                    </div>
                    <div>
                        <p>Accent Color 1</p>
                        <input className="custom-theme-button" placeholder={`${accent1}`} onChange={(reg) => {setAccent1(reg.target.value); localStorage.setItem('accent1', reg.target.value)}}></input>
                    </div>
                    <div>
                        <p>Accent Color 2</p>
                        <input className="custom-theme-button" placeholder={`${accent2}`} onChange={(reg) => {setAccent2(reg.target.value); localStorage.setItem('accent2', reg.target.value)}}></input>
                    </div>
                    <div>
                        <p>Text Color</p>
                        <input className="custom-theme-button" placeholder={`${text}`} onChange={(reg) => {setText(reg.target.value); localStorage.setItem('text', reg.target.value)}}></input>
                    </div>
                    <div>
                        <p>Correct Color</p>
                        <input className="custom-theme-button" placeholder={`${correct}`} onChange={(reg) => {setCorrect(reg.target.value); localStorage.setItem('correct', reg.target.value)}}></input>
                    </div>
                    <div>
                        <p>Incorrect Color</p>
                        <input className="custom-theme-button" placeholder={`${incorrect}`} onChange={(reg) => {setIncorrect(reg.target.value); localStorage.setItem('incorrect', reg.target.value)}}></input>
                    </div>
                    <div>
                        <p>Underlay Color</p>
                        <input className="custom-theme-button" placeholder={`${underlay}`} onChange={(reg) => {setUnderlay(reg.target.value); localStorage.setItem('underlay', reg.target.value)}} />
                    </div>
                    <div>
                        <p>Border Color</p>
                        <input className="custom-theme-button" placeholder={`${border}`} onChange={(reg) => {setBorder(reg.target.value); localStorage.setItem('border', reg.target.value)}}></input>
                    </div>
                    <div>
                        <p>Button Color</p>
                        <input className="custom-theme-button" placeholder={`${button}`} onChange={(reg) => {setButton(reg.target.value); localStorage.setItem('button', reg.target.value)}}></input>
                    </div>
                    <div></div>
                    <div>
                        <button className="custom-theme-change" style={{marginTop: '1vh'}} onClick={() => {toggleCustomTheme(); setRerenderCustom(!rerenderCustom)}}>Change!</button>
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
