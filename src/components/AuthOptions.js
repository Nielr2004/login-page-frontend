import React from 'react';
import { NavLink } from 'react-router-dom';
import './AuthOptions.css'; // Optional: Create a CSS file for styling

const AuthOptions = () => {
    return (
        <div className="auth-options">
            <h2>Welcome! Please choose an option:</h2>
            <div className="options">
                <NavLink to="/login" className="option">
                    Login
                </NavLink>
                <NavLink to="/signup" className="option">
                    Signup
                </NavLink>
                <NavLink to="/verify-otp" className="option">
                    OTP Login
                </NavLink>
            </div>
        </div>
    );
};

export default AuthOptions;