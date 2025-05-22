import React, { useState } from 'react';
import { GiLeafSwirl } from "react-icons/gi";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import bgImage from '../Image/rose.jpg';
import '../Style/auth.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

 const handleLogin = async () => {
    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    const response = await fetch("https://localhost:7237/api/Auth/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ UserName: username, Password: password }),
    });

    if (response.ok) {
        const userData = await response.json();
        console.log("API Response:", userData);

        localStorage.setItem("userRole", userData.role);
        localStorage.setItem("userId", userData.userId);
        localStorage.setItem("username", username); // <- set the username from input

        if (userData.role === 1) {
            navigate("/user");
        } else {
            navigate("/shop");
        }
    } else {
        alert("Invalid Credentials");
    }
};

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div
      className='login-page'
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='login-container'>
        <div className='login-header'>
          <GiLeafSwirl />
          <h2>Bucket</h2>
        </div>

        <div className='login-form'>
          <div className='input-group'>
            <label>Username or Email</label>
            <input
              type='text'
              placeholder='Enter Username or Email'
              value={username}
               onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className='input-group'>
            <label>Password</label>
            <div className='password-wrapper' style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <a href='/' className='forgot-password'>Forgot Password?</a>

          <div className='button-group'>
            <button onClick={handleLogin}>Login</button>
          </div>

          <span>----------------------OR---------------------</span>

          <div className='button-group'>
            <button>Google</button>
          </div>

          <a href='/register' className='new-user'>Don't have account? Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
