import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import bgImage from '../Image/rose.jpg';
import { GiLeafSwirl } from "react-icons/gi";
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        roleId: 0,
        status: 'Active'
    });

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7005/api/User/AddUser', formData);
            alert(response.data.message);
        } catch (error) {
            alert("Registration failed");
            console.error("Error registering user:", error);
        }
    };

    return (
        <div className='login-page' style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='login-container'>
                <div className='login-header'>
                    <GiLeafSwirl /><h2>PickBazar</h2>
                </div>
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label>Username</label>
                        <input
                            type='text'
                            name='username'
                            placeholder='Enter Username'
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='input-group'>
                        <label>Email</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter Email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='input-group'>
                        <label>Password</label>
                        <div className='password-wrapper' style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='Enter Password'
                                value={formData.password}
                                onChange={handleChange}
                                required
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

                    {/* Optional dropdown for selecting role (admin only use case) */}
                    {/* <div className='input-group'>
                        <label>Role</label>
                        <select name='roleId' value={formData.roleId} onChange={handleChange}>
                            <option value={0}>Select Role (default: User)</option>
                            <option value={1}>Admin</option>
                            <option value={2}>User</option>
                        </select>
                    </div> */}

                    <a href='/' className='forgot-password'>Forgot Password?</a>
                    <div className='button-group'>
                        <button type="submit">Register</button>
                    </div>
                    <span>----------------------OR---------------------</span>
                    <div className='button-group'>
                        <button type="button">Google</button>
                    </div>
                    <a href='/' className='new-user'>You have an account? Login</a>
                </form>
            </div>
        </div>
    );
}

export default Register;
