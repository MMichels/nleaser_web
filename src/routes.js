import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { GlobalStyle } from "./styles/global";
import { isAuthenticated } from "./services/auth";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DashboardRoutes from "./pages/DataFiles/routes";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={
                        {
                            pathname: "/",
                            state: { from: props.location }
                        }
                    } />
                )
        }
    />
);

const Routes = () => (
    <BrowserRouter>        
        <GlobalStyle />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            {DashboardRoutes()}
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;