import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import loginWithCookies from '../../helpers/APICalls/loginWithCookies';

const ProtectedRoute = (routeProps: RouteProps): JSX.Element => {
  const { loggedInUser, updateLoginContext } = useAuth();

  useEffect(() => {
    if (loggedInUser) {
      return;
    }
    (async () => {
      const data = await loginWithCookies();
      if (data.success) {
        console.log(data);
        updateLoginContext(data.success);
      }
    })();
  }, [loggedInUser, updateLoginContext]);

  return loggedInUser ? <Route {...routeProps} /> : <Redirect to="/login" />;
};

export default ProtectedRoute;
