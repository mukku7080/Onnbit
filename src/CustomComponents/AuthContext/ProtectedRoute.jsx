import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("authToken")
    const emailVerified = sessionStorage.getItem('emailVerified') == null;
    if (!emailVerified) {
        return <Navigate to={'/email-verification'}/>
    }
    return token ? children : <Navigate to={'/login'} />;
}

export default ProtectedRoute