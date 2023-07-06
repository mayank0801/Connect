
export default function ShowRelatedUser({relatedUser,setShowRelatedUserModal}){
    return (
        <div>
            <h1>{relatedUser?.title}</h1>
        <div>
            {
            relatedUser.list.map((user)=>(
                    <div>
                    <img src={user.profileAvatar} alt="userImage"/>
                    <p>{user.username}</p>
                </div>
                ))
            }
        </div>
        <button onClick={()=>setShowRelatedUserModal({...relatedUser,show:false})}>Close</button>
        </div>
    )

}