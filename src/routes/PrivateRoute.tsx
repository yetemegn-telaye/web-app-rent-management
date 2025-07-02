import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

interface PrivateRouteProps {
  allowedRoles: Array<'manager' | 'tenant'>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { user, userType, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // you can replace this with a spinner
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!userType || !allowedRoles.includes(userType)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
