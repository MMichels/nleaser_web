import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { GlobalStyle } from "./styles/global";
import { isAuthenticated } from "./services/auth";
import { Home } from "./pages/home";
import { CadastroPage } from "./pages/acesso/cadastro";
import { LoginPage } from "./pages/acesso/login";
import { DashboardRoutes } from "./pages/dashboard/routes";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={ props => isAuthenticated() ? ( <Component {...props} /> ) : ( 
                    <Redirect to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )}
    />
);

const Routes = () => (
    <BrowserRouter>        
        <GlobalStyle />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/cadastro" component={CadastroPage} />
            { DashboardRoutes() }
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;