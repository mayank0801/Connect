
import { Link, useNavigate } from "react-router-dom";


const Landing=()=>{
    const navigate=useNavigate();



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