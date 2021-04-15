import React from "react";
import { PrivateRoute } from "../../routes";
import { DashboardPage } from "./index";
import { AdicionarDatasetPage } from "./db-adicionar-dataset";

export const DashboardRoutes = () => (
    new Array([
        <PrivateRoute path="/dashboard/add" component={AdicionarDatasetPage} />,
        <PrivateRoute path="/dashboard" component={DashboardPage} />
    ])
);
export default DashboardRoutes;