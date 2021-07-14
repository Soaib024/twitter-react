import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from './../store/UserContext';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const userLoggedIn = useContext(UserContext)
  return (
    <Route
      {...rest}
      render={props =>
        userLoggedIn.isSignedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
