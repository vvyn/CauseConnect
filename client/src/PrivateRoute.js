import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth';

const PrivateRoute = ({ element: Component, allowedRoles }) => {
  const { currentUser, role } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/" state={{ from: location }} />;
  } else if (allowedRoles.includes(role)) {
    return <Component />;
  } else {
    return <Navigate to="/error" state={{ from: location }} />;
  }
};

export default PrivateRoute;