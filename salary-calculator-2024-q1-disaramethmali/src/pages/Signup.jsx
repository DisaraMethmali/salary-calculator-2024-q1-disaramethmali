import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CustomTextField from "../components/textfield";
import { Box, Typography ,Button} from '@mui/material'; 
const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ target }) => {
        setData({ ...data, [target.name]: target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:5000/users";
            const { data: res } = await axios.post(url, data);
            navigate("/pages/login");
            console.log(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div>
            <div>
                <Typography variant="h5">Welcome Back</Typography>
                <Link to="/login">
                    <Button variant="contained" color="primary">
                        Sign in
                    </Button>
                </Link>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5">Create Account</Typography>
                    <CustomTextField
                        type="text"
                        label="First Name"
                        name="firstName"
                        onChange={handleChange}
                        value={data.firstName}
                        required
                    />
                    <CustomTextField
                        type="text"
                        label="Last Name"
                        name="lastName"
                        onChange={handleChange}
                        value={data.lastName}
                        required
                    />
                    <CustomTextField
                        type="email"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                        required
                    />
                    <CustomTextField
                        type="password"
                        label="Password"
                        name="password"
                        onChange={handleChange}
                        value={data.password}
                        required
                    />
                    {error && <div>{error}</div>}
                    <Button type="submit" variant="contained" color="primary">
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
