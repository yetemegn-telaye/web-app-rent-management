import React from 'react';
import { Navigate, RouteProps, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust based on your store setup

interface PrivateRouteProps {
  allowedRoles: string[];
}


const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const  isAuthenticated = window.localStorage.getItem('token');
  const role = window.localStorage.getItem('role');
 console.log(isAuthenticated,role);

  if (!isAuthenticated) {
   
    return <Navigate to="/" />;
  } else if (role && !allowedRoles.includes(role)) {
    
    return <Navigate to="/unauthorized" />;
  }

  
  return <Outlet />;
};

export default PrivateRoute;
