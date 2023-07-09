
export default function ShowRelatedUser({relatedUser,setShowRelatedUserModal}){
    return (
        <div style={{backgroundColor:"#16181C",padding:"1rem",borderRadius:"20px"}}>
            <h1 style={{textAlign:"center"}}>{relatedUser?.title}</h1>
        <div >
            {
            relatedUser.list.map((user)=>(
                    <div style={{display:"flex",alignItems:"center",justifyContent:"start",cursor:"pointer"}}>
                    <img style={{height:"50px",width:"50px",borderRadius:"50px",marginRight:"0.5rem"}} src={user.profileAvatar} alt="userImage"/>
                    <p>{user.username}</p>
                </div>
                ))
            }
        </div>
        <span style={{position:"relative",left:"40%",cursor:"pointer"}}>
        <button  className="btn" onClick={()=>setShowRelatedUserModal({...relatedUser,show:false})}>Close</button>
        </span>
        </div>
    )

}