import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import {LoggedInUserContext} from "../contexts/LoggedInUserContext";

function withProtectedRoute(Component) {
  return ({...props}) => {
    const loggedIn = useContext(LoggedInUserContext);
    return loggedIn ? <Component {...props}/> : <Navigate to={"/sing-in"} replace/>
  };
}

export default withProtectedRoute;
