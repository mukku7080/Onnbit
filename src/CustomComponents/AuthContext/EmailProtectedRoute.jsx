import React from 'react'
import { Navigate } from 'react-router-dom'

const EmailProtectedRoute = ({ children }) => {
    if (sessionStorage.getItem('emailVerified')===false) {
        return <Navigate to="/email-verification" />
    }
   
    // return token ? children : <Navigate to={'/login'} />;
}
export default EmailProtectedRoute