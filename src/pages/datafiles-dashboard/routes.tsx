import React from "react";
import { PrivateRoute } from "../../routes";
import { DataFilesDashboardPage } from "./index";

export const DataFilesDashboardRoutes = () => (
    new Array([
        <PrivateRoute path="/dashboard/datafiles" component={DataFilesDashboardPage} />
    ])
);
export default DataFilesDashboardRoutes;