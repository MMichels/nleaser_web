import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { GlobalStyle } from "./styles/global";
import { isAuthenticated } from "./services/auth";
import SignUp from "./pages/SignUp/index";
import SignIn from "./pages/SignIn/index";

const PrivateRoute = ({ component: Component, ...rest }) => (
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
            <Route exact path="/" component={() => <h1>Home Page</h1>} />
            <Route path="/login" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute path="/dashboard" component={() => <h1>Dashboard</h1>} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;