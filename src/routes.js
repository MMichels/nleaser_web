
import "./styles/global.scss"

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Home } from "./pages/home";
import { CadastroPage } from "./pages/acesso/cadastro";
import { LoginPage } from "./pages/acesso/login";
import { DataFilesDashboardRoutes } from "./pages/datafiles-dashboard/routes";
import { NLPDashboardRoutes } from "./pages/nlp-methods-dashboard/routes";
import { NLPTutorialRoutes } from "./pages/tutorial/routes"
import { BackgroundComponent } from "./components/Background";
import { HeaderComponent } from "./components/Header";
import { AuthenticationContextProvider as AuthenticationProvider, useAuth } from "./contexts/AuthenticationContext";

export const PrivateRoute = ({ component: Component, ...rest }) => {    
    var {isAuthenticated} = useAuth();
    return (
        <Route
            {...rest}
            render={ props => isAuthenticated ? ( <Component {...props} /> ) : ( 
                        <Redirect to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )}
        />
    )
};

const Routes = () => (
    <BrowserRouter>
        <BackgroundComponent>
            <AuthenticationProvider>
                <HeaderComponent />
                <Switch>
                    <Route exact path="/" >
                        <Home />
                    </Route>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/cadastro">
                        <CadastroPage />
                    </Route>
                    { DataFilesDashboardRoutes() }
                    { NLPDashboardRoutes() }
                    { NLPTutorialRoutes() }
                    <Route path="*" component={() => <h1>Page not found</h1>} />
                </Switch>
            </AuthenticationProvider>
        </BackgroundComponent>
    </BrowserRouter>
);

export default Routes;