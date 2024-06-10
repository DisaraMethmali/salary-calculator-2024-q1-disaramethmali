import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            {/* Display other profile data */}
        </div>
    );
};

export default Profile;
