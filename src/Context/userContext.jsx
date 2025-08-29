import React, { createContext, useContext, useEffect, useState } from 'react'
import { changePassword, changeProfilePic, changeUserName, userDetails, userDetailsByUserId } from '../api/userService'
import { useLocation } from 'react-router-dom';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [error, setError] = useState(null);
    const [getUserById, setUserById] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const shouldFetch = location.pathname === "/user-Dashboard";

        if (token && shouldFetch) {
            handleUserDetail();
        }
    }, [location.pathname]); // ✅ keep this clean

    const handleUserDetail = async () => {
        try {
            const response = await userDetails();
            setUser(response.response);
            localStorage.setItem("user", JSON.stringify(response.response)); // ✅ persist it
            return response;
        } catch (error) {
            console.error("userDetails error:", error);
            setError(error);
        }
    };
    const handleUserDetailByUserId = async (user_id) => {
        try {

            const response = await userDetailsByUserId(user_id);
            setUserById(response?.response);
            return response;

        }
        catch (error) {

            setError(error);
        }
    }
    const handleChangeProfilePic = async (file) => {
        try {
            const response = await changeProfilePic(file);
            return response;
        }
        catch (error) {
            console.error("Error uploading image:", error);

        }
    }
    const handleChangePassword = async (values) => {
        try {
            const res = changePassword(values);
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    const handleUserNameChange = async (username) => {
        try {
            const res = changeUserName(username);
            return res;
        }
        catch (error) {
            setError(error.response ? error.response.data : error);
            throw error;
        }
    }
    return (
        <UserContext.Provider value={{ user, error, setUser, handleChangeProfilePic, handleChangePassword, handleUserNameChange, getUserById, handleUserDetailByUserId, handleUserDetail }}>
            {children}
        </UserContext.Provider>
    )
}
export const useUser = () => {
    return useContext(UserContext)
}


export default UserProvider