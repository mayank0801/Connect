import React, { useContext, useEffect, useRef, useState } from 'react'
import { cloudinaryImageFetcher, updateUserhandler } from '../services/postServices';
import { AuthContext } from '../context/AuthContext';
import {AiOutlineCamera} from "react-icons/ai";

const avatars = [
  "https://png.pngtree.com/png-clipart/20210619/ourlarge/pngtree-instagram-social-media-men-round-glasses-avatar-png-image_3483988.jpg",
  "https://png.pngtree.com/png-clipart/20210619/ourlarge/pngtree-instagram-lady-social-media-flat-style-avatar-png-image_3483977.jpg",
  "https://images.assetsdelivery.com/compings_v2/elvie15veronika/elvie15veronika2005/elvie15veronika200500053.jpg",
  "https://media.istockphoto.com/id/1227320122/es/vector/lindo-icono-de-avatar-de-chica-vectorial-bonito-retrato-de-dama.jpg?s=170667a&w=0&k=20&c=cWF7e0o_IU-ZJpWb2G8ZocBPM6hY6W5EyRY3m_eUUK8=",
  "https://img.freepik.com/premium-vector/hippie-old-woman-avatar-vector-illustration_621685-62.jpg?w=2000",
  "https://img.freepik.com/premium-vector/portrait-elderly-man-wearing-glasses-avatar-grandfather-social-media_645574-624.jpg",
];
export const EditProfileModal = ({intialState,setEditProfileModal}) => {
    const [userData,setuserData]=useState(intialState);
    const {token,userInfo,updateUser}=useContext(AuthContext);
    const [profileFileAvatar,setProfileAvatar]=useState(intialState.profileAvatar)
    const inputRef=useRef(null);

    const handleChange=(event)=>{
        const {name,value}=event.target;
        setuserData({...userData,[name]:value})
    }

    const handleSubmit=async()=>{
      let profileAvatarUrl=await cloudinaryImageFetcher(profileFileAvatar);
      console.log(profileAvatarUrl.url);
      if(!profileAvatarUrl)profileAvatarUrl=intialState?.profileAvatar;
      updateUserhandler({...userData,profileAvatar:profileAvatarUrl.url},token,updateUser)
      setEditProfileModal(false);
    }

    


      const performAction = () => {
        inputRef.current.click()
      };

    

    
  return (
    <div style={{border:"1px solid red"}}>

      <div style={{display:"flex",flexWrap:"wrap"}}>
        {
          avatars.map((avatar)=><div><img className='avtar-image' src={avatar} alt='avatar' onClick={()=>setProfileAvatar(avatar)}/></div>)
        }

      </div>
            <img style={{width:"80px",height:"80px",borderRadius:"50%"}} src={profileFileAvatar}  alt='profileAvtar'/>
            <AiOutlineCamera onClick={performAction}/>
            <input type='file' ref={inputRef} style={{display:"none"}} onChange={(e)=>setProfileAvatar(URL.createObjectURL(e.target.files[0]))}/>
        <div>
            <input name='bio' type='text' value={userData?.bio} onChange={handleChange}/>
            <input name='website' type='text' value={userData?.website} onChange={handleChange}/>
        </div>
        <button onClick={()=>handleSubmit()}>Update</button>
    </div>
  )
}
