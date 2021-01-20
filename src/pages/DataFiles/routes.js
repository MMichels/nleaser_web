import React from "react";
import { PrivateRoute } from "../../routes";
import DataFiles from "./index";
import DataFilesAdd from "./DataFiles-Add";

const DashboardRoutes = () => (
    new Array([
        <PrivateRoute path="/dashboard/add" component={DataFilesAdd} />,
        <PrivateRoute path="/dashboard" component={DataFiles} />
    ])
);
export default DashboardRoutes;