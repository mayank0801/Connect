import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth=({children})=>{
    const {token}=useContext(AuthContext);
    
    return(
        <>
        {token?(children):<Navigate to="/landing"/>}
        </>
    )
}


export default RequireAuth;



