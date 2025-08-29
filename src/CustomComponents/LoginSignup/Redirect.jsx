import React, { useState, useEffect } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";

const Redirect = () => {
    const [message, setMessage] = useState("Getting message");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const key = urlParams.get('key');

        if (!key) {
            setMessage("Invalid request.");
            setLoading(false);
            return;
        }

        fetch(`https://api.onnbit.com/api/auth/get-authenticate-token?key=${key}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.token) {
                    setMessage("Login Successfully! Redirecting...");
                    localStorage.setItem('authToken', data.token);
                    console.log(data.token);

                    // Store token securely (example)
                    // sessionStorage.setItem("auth_token", data.token);
                    console.log(data);

                    // Redirect after 3 seconds
                    setTimeout(() => {
                        window.location.href = "/user-dashboard";
                    }, 3000);
                } else {
                    setMessage("waiting...");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setMessage("Login Failed. Please try again.");
                setLoading(false);

                setTimeout(() => {
                    setMessage("Please log in again.");
                }, 3000);
            });
    }, []);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Box textAlign="center">
                {loading ? (
                    <Spinner size="xl" />
                ) : (
                    <Text fontSize="xl">{message}</Text>
                )}
            </Box>
        </Box>
    );
};

export default Redirect;