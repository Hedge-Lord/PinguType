import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/pingutype.png';

function Login() {
    let navigate = useNavigate();

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
          login or sign-up below
        </h2>
        <p className="username-spot">
          <span style={{ fontSize: '18px' }}>
            Username:
            <textarea className="username-area" rows="1" cols="40" />
          </span>
        </p>
        <p className="password-spot">
          <span style={{ fontSize: '18px' }}>
            Password:
            <textarea className="password-area" rows="1" cols="40" />
          </span>
        </p>
        <div className="signupAndLogin">
          <button className="signup" onClick={() => {navigate('/profile');}}>Sign-up</button>
          <button className="login" onClick={() => {navigate('/profile');}}>Login</button>
        </div>
      </body>
    </html>
    );
  }

  export default Login;