import React, { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function ShowPassword({value}) {
  return(
    <button onMouseDown={() => showPassword(value)} 
      onMouseUp={() => unshowPassword(value)}
      onMouseLeave={() => unshowPassword(value)}
      className="show-password">
        Show</button>
  )
}

function showPassword(idof) {
  var x = document.getElementById(idof);
  x.type = 'text'
}

function unshowPassword(idof) {
  var x = document.getElementById(idof);
  x.type = 'password';
}


function Login() {
    const [user,setUser]=useState('');
    const [password,setPassword]=useState('');
    const [newUser, setNewUser]=useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyNewPassword, setVerifyNewPassword] = useState('');
    const [isIncorrectVerify, setIsIncorrectVerify] = useState(false);
    const [isCorrectUsernamePassword, setIsCorrectUsernamePassword] = useState(false);
    const navigate = useNavigate();

    const loginSubmit = (login) =>
    {
      login.preventDefault();
      axios.post('https://pingutype-backend-6f7213dfc12e.herokuapp.com/login', {username: user, password: password}, {withCredentials: true})
      .then(result=>{console.log(result)
        if(result.data.success)
        {
          navigate("/profile");
          window.location.reload(false);
        }
      })
      .catch(err => {console.log(err); setIsCorrectUsernamePassword(true); });
    }
    const registerSubmit = (register) =>
    {
      if (verifyNewPassword !== newPassword) {
        setIsIncorrectVerify(true);
        return;
      }
      register.preventDefault();
      axios.post('https://pingutype-backend-6f7213dfc12e.herokuapp.com/register', {username: newUser, password: newPassword}, {withCredentials: true})
      .then(result=> {console.log(result)
        axios.post('https://pingutype-backend-6f7213dfc12e.herokuapp.com/login', {username: newUser, password: newPassword}, {withCredentials: true})
        .then(result=>{console.log(result)
          if(result.data.success)
          {
            navigate("/profile");
            window.location.reload(false);
          }
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    }
    return (
      <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PinguType</title>
        <link rel="stylesheet" href="../styles/style.css" />
        <link rel="shortcut icon" href="../assets/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <h2 className="description-signup" style={{ marginBottom: 0 }}>
          
        </h2>
        <div className="login-main-body">
          <div className="register-login-spot">
            <h3>Register</h3>
            <p className="username-spot">
              <span style={{ fontSize: '18px' }}>
                <input className="username-area" type='text' rows="1" cols="40" placeholder="Username" onChange={(reg) => setNewUser(reg.target.value)}/>
              </span>
            </p>
            <p className="password-spot">
              <span style={{ fontSize: '18px' }}>
                <input className="password-area" type='password' id="ps1" rows="1" cols="40" placeholder='Password' onChange={(reg) => setNewPassword(reg.target.value)}/>
                <ShowPassword value="ps1" />
              </span>
            </p>
            <p className="password-spot">
              <span style={{ fontSize: '18px' }}>
                <input className="password-area" type='password' id="ps2" rows="1" cols="40" placeholder='Verify password' onChange={(reg) => setVerifyNewPassword(reg.target.value)}/>
                <ShowPassword value="ps2" />
              </span>
            </p>
            <button className="signup" onClick={registerSubmit}>Sign-up</button>
          </div>
          <div className="register-login-spot">
            <div className="signupAndLogin">
            <h3>Login</h3>
            <p className="username-spot">
                <span style={{ fontSize: '18px' }}>
                  <input className="username-area" type='text' rows="1" cols="40" placeholder="Username" onChange={(log) => setUser(log.target.value)}/>
                </span>
              </p>
              <p className="password-spot">
                <span style={{ fontSize: '18px' }}>
                  <input className="password-area" type='password' id="ps3" rows="1" cols="40" placeholder='Password' onChange={(log) => setPassword(log.target.value)}/>
                  <ShowPassword value="ps3" />
                </span>
              </p>            
              <p className="invisible-password-spot">
                <span style={{ fontSize: '18px' }}>
                  <input className="password-area" type='password' id="ps2" rows="1" cols="40" placeholder='Verify password' />
                  <ShowPassword value='ps2' />
                </span>
              </p>
              <button className="login" onClick={loginSubmit}>Login</button>
            </div>
          </div>
        </div>
        <h2 className={isIncorrectVerify ? 'show-incorrect-verify' : 'dont-show-incorrect-verify'}>Passwords don't match</h2>
        <h2 className={isCorrectUsernamePassword ? 'show-incorrect-username' : 'dont-show-incorrect-username'}>Incorrect username or password</h2>
      </body>
    </html>
    );
  }

  export default Login;