import React from "react";
import { PrivateRoute } from "../../routes";
import { NLPTutorial } from "./index";

export const NLPTutorialRoutes = () => (
    new Array([
        <PrivateRoute path="/tutorial" component={NLPTutorial} />
    ])
);
export default NLPTutorialRoutes;