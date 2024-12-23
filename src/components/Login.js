import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
    const [name, setName] = useState(''); // State for name
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  // State to store error message
    const [loading, setLoading] = useState(false);  // To handle loading state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);  // Show loading indicator
        setError('');  // Clear any previous errors
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { name, password });
            alert('Login successful: ' + response.data.token);
            localStorage.setItem('token', response.data.token);  // Store token in localStorage
            setLoading(false);  // Hide loading after successful login
            navigate('/profile'); // Redirect to profile page after login
        } catch (error) {
            setLoading(false);  // Hide loading after error
            if (error.response) {
                setError(error.response.data.message);  // Show error message from server
            } else {
                setError('Error connecting to the server. Please try again later.');
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}
                
                {/* Forgot Password Link */}
                <p>
                    <NavLink to="/forgot-password">Forgot Password?</NavLink>
                </p>

                <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            </form>
        </div>
    );
};

export default Login;