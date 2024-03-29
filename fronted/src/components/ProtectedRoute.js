import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({component: Component, ...props}) => {
  return(
    props.loggedIn ? <Component {...props} />: <Redirect to="sign-in" />
    )
}

export default ProtectedRoute