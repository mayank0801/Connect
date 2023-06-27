import React, { useContext } from 'react'
import { useState } from 'react'
import { PostContext } from '../../context/PostContext';
import { searchUser } from '../../utlis/utlis';

export const SearchUser = () => {
const {state:{users}}=useContext(PostContext);
const [searchUserText,setSearchUserText]=useState("");
const searchSuggestedUser=searchUser(users,searchUserText);
console.log(users,"search",searchSuggestedUser);

  return (
    <div>
        <div>
            <input type='text' value={searchUserText} onChange={(e)=>setSearchUserText(e.target.value.trim())}/>
              <div style={{height:"100px"}}>
                {
                  searchSuggestedUser.map((user)=><div style={{display:"flex",alignItems:"center",height:"60px"}}>
                    <img height={"50px"} src={user.profileAvatar} alt='userPhoto'/>
                    <p>{user.username}</p>
                  </div>)
                }
              </div>
        </div>
    </div>
  )
}
