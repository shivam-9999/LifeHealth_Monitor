import { Navigate } from 'react-router-dom';
import React from 'react';

import { useAuth } from '../../hooks/useAuth';

const PatientOnlyRoute = ({ children }) => {

  const { isLoggedIn, role } = useAuth();

  if (isLoggedIn === null) {
    // still checking if user is authenticated
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (!isLoggedIn) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  if (role !== "patient") {
    return <Navigate to="/" />;
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};

export default PatientOnlyRoute;
