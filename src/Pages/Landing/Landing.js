import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Landing=()=>{
    const navigate=useNavigate();
    const {token}=useContext(AuthContext);


    // useEffect(()=>{
    //     console.log(token,"Hii");
    //     if(token){
    //         navigate("/home");
    //     }
    // },[])

    
    return(
        <>
        <button onClick={()=>navigate("/signUp")}>Join Us</button>
        <Link to="/login">Already have Account</Link>
        </>
    )
}


export default Landing;