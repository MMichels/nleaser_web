import React from "react";
import { PrivateRoute } from "../../routes";
import { NLPDashBoardPage } from "./index";

export const NLPDashboardRoutes = () => (
    new Array([
        <PrivateRoute path="/dashboard/nlp/:datafile_id" component={NLPDashBoardPage} />
    ])
);
export default NLPDashboardRoutes;