import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext'; 

const ProtectedRoute = ({ redirectTo = "/login" }) => {
    const { isAuthenticated } = useUser();
    
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
};

const AuthRedirect = ({ redirectTo = "/" }) => {
    const { isAuthenticated } = useUser();

    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
};

export { ProtectedRoute, AuthRedirect };