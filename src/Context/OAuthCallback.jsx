import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("authToken", token); // Save token for future use
            navigate("/dashboard"); // Redirect to dashboard
        }
    }, []);

    return <h2>Logging in...</h2>;
};

export default OAuthCallback;
