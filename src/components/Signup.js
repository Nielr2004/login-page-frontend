import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState(''); // State for name
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
            alert('Signup successful');
            localStorage.setItem('token', response.data.token); // Store token in localStorage
            navigate('/profile'); // Redirect to profile page after signup
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Error connecting to the server. Please try again later.');
            }
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
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
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;