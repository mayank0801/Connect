import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const RequireAuth=({children})=>{
    const {token}=useContext(AuthContext);
    return(
        <>
        {token?(children):<Navigate to="/landing"/>}
        </>
    )
}


export default RequireAuth;



