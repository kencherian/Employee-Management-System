// EMS/frontend/src/utils/RoleBaseRoutes.jsx
import React from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

const RoleBaseRoutes = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="text-center mt-10 text-xl font-bold">Loading...</div>;
    }

    if (!requiredRole.includes(user?.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return user ? children : <Navigate to="/login" />;
};

export default RoleBaseRoutes;