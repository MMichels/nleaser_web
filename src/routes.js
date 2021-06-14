
import "./styles/global.scss"

import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";
import { Home } from "./pages/home";
import { CadastroPage } from "./pages/acesso/cadastro";
import { LoginPage } from "./pages/acesso/login";
import { DataFilesDashboardRoutes } from "./pages/datafiles-dashboard/routes";
import { NLPDashboardRoutes } from "./pages/nlp-methods-dashboard/routes";
import {NLPTutorialRoutes} from "./pages/tutorial/routes"

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={ props => isAuthenticated() ? ( <Component {...props} /> ) : ( 
                    <Redirect to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )}
    />
);

const Routes = () => (
    <BrowserRouter>    
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/cadastro" component={CadastroPage} />
            { DataFilesDashboardRoutes() }
            { NLPDashboardRoutes() }
            { NLPTutorialRoutes() }
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;