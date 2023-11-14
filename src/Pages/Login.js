import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
    let navigate = useNavigate();
    const handleClick = () => {
      navigate('/profile');
    };
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
        <div className="login-main-body">
          <div className="register-login-spot">
            <h3>Register</h3>
            <p className="username-spot">
              <span style={{ fontSize: '18px' }}>
                <textarea className="username-area" rows="1" cols="40" placeholder="Username"></textarea>
              </span>
            </p>
            <p className="password-spot">
              <span style={{ fontSize: '18px' }}>
                <textarea className="password-area" rows="1" cols="40" placeholder="Password"></textarea>
              </span>
            </p>
            <p className="password-spot">
              <span style={{ fontSize: '18px' }}>
                <textarea className="password-area" rows="1" cols="40" placeholder="Verify password"></textarea>
              </span>
            </p>
            <button className="signup" onClick={handleClick}>Sign-up</button>
          </div>
          <div className="register-login-spot">
            <div className="signupAndLogin">
            <h3>Login</h3>
            <p className="username-spot">
                <span style={{ fontSize: '18px' }}>
                  <textarea className="username-area" rows="1" cols="40" placeholder="Username"></textarea>
                </span>
              </p>
              <p className="password-spot">
                <span style={{ fontSize: '18px' }}>
                  <textarea className="password-area" rows="1" cols="40" placeholder="Password"></textarea>
                </span>
              </p>
              <br />
              <br />
              <button className="login" onClick={handleClick}>Login</button>
            </div>
          </div>
        </div>
      </body>
    </html>
    );
  }

  export default Login;