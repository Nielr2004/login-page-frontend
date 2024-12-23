import React, { useState } from 'react';
import axios from 'axios';

const OtpVerification = () => {
    const [email, setEmail] = useState(''); // State for email
    const [otp, setOtp] = useState(''); // State for OTP
    const [newPassword, setNewPassword] = useState(''); // State for new password
    const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
    const [error, setError] = useState(''); // State for error message
    const [loading, setLoading] = useState(false); // To handle loading state

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading indicator
        setError(''); // Clear previous errors

        // Check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match.');
            setLoading(false);
            return;
        }

        try {
            // Send request to verify OTP and reset password
            const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp, newPassword });
            alert('Password reset successful! You can now log in with your new password.');
            setLoading(false); // Hide loading after successful password reset
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
            <h2>Reset Your Password</h2>
            <form onSubmit={handleVerifyOtp}>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter your OTP"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                <button type="submit" disabled={loading}>
                    {loading ? 'Verifying OTP...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default OtpVerification;