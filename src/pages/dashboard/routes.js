import React from "react";
import { PrivateRoute } from "../../routes";
import { DashboardPage } from "./index";

export const DashboardRoutes = () => (
    new Array([
        <PrivateRoute path="/dashboard" component={DashboardPage} />
    ])
);
export default DashboardRoutes;