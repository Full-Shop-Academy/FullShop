import React, { useState } from 'react';
import { fakeUserRegistration } from '../../api/fakeStoreApi'; // Update the path accordingly
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        firstname: '',
        lastname: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fakeUserRegistration({
            email: formData.email,
            username: formData.username,
            password: formData.password,
            name: {
                firstname: formData.firstname,
                lastname: formData.lastname
            }
        });

        if (response && response.id) {
            setMessage('Registration successful!');
        } else {
            setMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={handleChange}
                />
                <button type="submit">Sign Up</button>
            </form>
            {message && <p className={response && response.id ? '' : 'error'}>{message}</p>}
        </div>
    );
};

export default Register;
