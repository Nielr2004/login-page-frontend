import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthOptions from './components/AuthOptions'; // Importing AuthOptions component
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import OtpVerification from './components/OtpVerification';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<AuthOptions />} /> {/* Set AuthOptions as the landing page */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/verify-otp" element={<OtpVerification />} />
                    <Route path="*" element={<div>404 Page Not Found</div>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;