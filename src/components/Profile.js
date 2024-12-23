import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userData, setUser Data] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser Data = async () => {
            const token = localStorage.getItem('token'); // Get the token from local storage
            if (!token) {
                navigate('/login'); // Redirect to login if no token
                return;
            }

            try {
                const response = await fetch('/api/user/profile', { // Adjust the endpoint as needed
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token, // Include the token in the request
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setUser Data(data); // Set user data if the response is successful
                } else {
                    console.error(data.message);
                    navigate('/login'); // Redirect to login on error
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login'); // Redirect to login on error
            }
        };

        fetchUser Data();
    }, [navigate]);

    if (!userData) {
        return <div>Loading...</div>; // Show loading while fetching data
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p><strong>Name:</strong> {userData.fname}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            {/* Add more user details as needed */}
        </div>
    );
};

export default Profile;