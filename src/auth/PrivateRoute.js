import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => (
    //props means all the components passed down to this private route component
    <Route
        {...rest}
        render={props => 
            isLoggedIn() ?
                (<Component{...props} />)
                :
                (<Redirect to={{ pathname: "/signin", state: { from: props.location } }} />)
    } />
)

export default PrivateRoute;