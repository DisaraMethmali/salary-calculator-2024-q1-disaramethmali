import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
		try {
			const url = "http://localhost:5000/login";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			const userEmail = data.email; // Get the email entered by the user
			let redirectPath = '/'; // Default redirection path
		
			// Redirect based on user's email address
			switch (email) {
				case "disaramethmali@2001.gmail.com":
					redirectPath = "/employee";
					break;
				case "duviniranaweera@gmail.com":
					redirectPath = "/vet";
					break;
				case "hasintha@gmail.com":
					redirectPath = "/user3";
					break;
				// Add more cases for other users as needed
				default:
					redirectPath = "/"; // Default redirection path
			}
		
			history.push(redirectPath);
				
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
            <form onSubmit={handleSubmit}>
                <h1>Login to Your Account</h1>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                />
                {error && <div>{error}</div>}
                <button type="submit">Sign In</button>
            </form>
            <div>
                <h1>New Here ?</h1>
                <Link to="/signup">
                    <button type="button">Sign Up</button>
                </Link>
            </div>
        </div>
    );
};

export default Login;
