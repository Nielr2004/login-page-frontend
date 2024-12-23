import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtpLogin = () => {
    const [email, setEmail] = useState(''); // State for email
    const [otp, setOtp] = useState(''); // State for OTP
    const [error, setError] = useState(''); // State to store error message
    const [loading, setLoading] = useState(false); // To handle loading state
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading indicator
        setError(''); // Clear any previous errors

        try {
            // Send request to send OTP to the provided email
            await axios.post('http://localhost:5000/api/auth/send-otp', { email });
            alert('OTP sent to your email. Please check your inbox.');
            setLoading(false); // Hide loading after OTP is sent
        } catch (error) {
            setLoading(false); // Hide loading after error
            if (error.response) {
                setError(error.response.data.message); // Show error message from server
            } else {
                setError('Error connecting to the server. Please try again later.');
            }
        }
    };

    const handleLoginWithOtp = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading indicator
        setError(''); // Clear any previous errors

        try {
            // Send request to verify OTP and log in
            const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
            alert('Login successful!'); // Notify user of successful login
            localStorage.setItem('token', response.data.token); // Store token in localStorage
            navigate('/profile'); // Redirect to profile page after successful login
        } catch (error) {
            setLoading(false); // Hide loading after error
            if (error.response) {
                setError(error.response.data.message); // Show error message from server
            } else {
                setError('Error connecting to the server. Please try again later.');
            }
        }
    };

    return (
        <div className="container">
            <h2>Login Using OTP</h2>
            <form onSubmit={handleSendOtp}>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
            </form>

            <form onSubmit={handleLoginWithOtp} style={{ marginTop: '20px' }}>
                <div>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter your OTP"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Verifying...' : 'Login with OTP'}
                </button>
            </form>
        </div>
    );
};

export default OtpLogin;