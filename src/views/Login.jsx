import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserToLocalStorage } from '../utils/localStorage'; // Import the necessary function
import './Login.css'; // Import the CSS file

const Login = ({ setLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (username && password) {
            alert('Login successful!');
            saveUserToLocalStorage({ username, password }); // Save user data to local storage
            setLoggedIn(true); // Update the loggedIn state
            navigate('/');
        } else {
            alert('Please enter both username and password.');
        }
    };

    return (
        <div className="login">
            <h2>Welcome Back!</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default Login;
