import { Link, useNavigate } from "react-router-dom";

const Landing=()=>{
    const naviagte=useNavigate();
    return(
        <>
        <button onClick={()=>naviagte("/signUp")}>Join Us</button>
        <Link to="/login">Already have Account</Link>
        </>
    )
}


export default Landing;