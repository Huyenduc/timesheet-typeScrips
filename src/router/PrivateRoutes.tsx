import { Outlet, Navigate } from "react-router-dom";

import { authentication } from "./Authentication";

const PrivateRoutes= () =>{

    return(
        authentication.isAuthentication() ? <Outlet/> : <Navigate to = "/Login"/>
    )
}

export default PrivateRoutes;