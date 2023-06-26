import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import {BiArrowBack} from "react-icons/bi";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { EditProfileModal } from '../../features/EditProfileModal';
import { followUser, unfollow } from '../../services/postServices';
import {GrLogout} from "react-icons/gr"


export const Profile = () => {
const {profileId}=useParams();
const {userInfo,token,updateUser,loaduserHandler,logoutHandler}=useContext(AuthContext);

const [profileDetail,setProfileDetail]=useState(null);
const [editProfileModal,setEditProfileModal]=useState(false);

const currentLoggedInUser=profileDetail?.username===userInfo?.username;
const isUserFollowing=userInfo?.following?.find(({username})=>username===profileDetail?.username);


console.log(isUserFollowing,"Rerend3er")

const navigate=useNavigate();

const getProfileData=async()=>{
  try {
    const response=await axios.get(`/api/users/${profileId}`);
    // console.log(response,"ProfilePage");
    setProfileDetail(response.data.user);
  } catch (error) {
    console.log(error,"ProfilePage")
  }
}


useEffect(()=>{
getProfileData();
},[])
useEffect(()=>{
  getProfileData();
},[userInfo])

  return (
    <div style={{width:"50%",border:"1px solid black"}}>
      <div style={{display:"flex",alignItems:"center"}}>
      <BiArrowBack size={30} onClick={()=>navigate("/")}/>
      <header>
      <h1>{profileDetail?.firstName}</h1>
      </header>
      </div>
      <div>
        <div>
    
        <img src={profileDetail?.profileAvatar} alt='profileAvtar'/>
           
        
          <h1>{profileDetail?.firstName}</h1>
          <p>{profileDetail?.username}</p>
          <p>{profileDetail?.bio}</p>

          {
            currentLoggedInUser?<div>
            <button onClick={()=>setEditProfileModal(!editProfileModal)}>Edit profile</button>
              <GrLogout onClick={()=>logoutHandler()}/>
            </div>:null
          }

          {
            !currentLoggedInUser&&isUserFollowing&&<p className='post-option-text' onClick={()=>unfollow(profileDetail?._id,token,updateUser,loaduserHandler)}>Unfollow</p>
          }
          {
            !currentLoggedInUser&&!isUserFollowing&&<p className='post-option-text' onClick={()=>followUser(profileDetail?._id,token,updateUser,loaduserHandler)}>Follow</p>
          }

        </div>
        {
          editProfileModal&&<EditProfileModal intialState={profileDetail} setEditProfileModal={setEditProfileModal}/>
        }
      </div>

      <div>
      </div>
    </div>
  )
}









// import axios from 'axios';
// import React from 'react'
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom'
// import {BiArrowBack} from "react-icons/bi";
// import { useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { EditProfileModal } from '../../features/EditProfileModal';

// export const Profile = () => {
// const {profileId}=useParams();

// const [profileDetail,setProfileDetail]=useState(null);
// const {userInfo}=useContext(AuthContext);
// // const [userPosts,setUserPosts]=useState([]);
// const [editProfileModal,setEditProfileModal]=useState(false);
// const currentLoggedInUser=profileDetail?.username===userInfo?.username;

// console.log(userInfo,"userInfo1 Render")

// const getProfileData=async()=>{
//   try {
//     const response=await axios.get(`/api/users/${profileId}`);
//     // console.log(response,"ProfilePage");
//     setProfileDetail(response.data.user);
//   } catch (error) {
//     console.log(error,"ProfilePage")
//   }
// }
// const getUserPosts=async()=>{
//   try {
//     const response=await axios.get(`/api/posts/user/${profileId}`);
//     // console.log(response,"ProfilePage")
//     setUserPosts(response.data.posts);
//   } catch (error) {
//     console.log(error);
//   }
// }

// useEffect(()=>{
// console.log("Render")
// getProfileData();
// // getUserPosts();
// },[])

//   return (
//     <div style={{width:"50%",border:"1px solid black"}}>
//       <div style={{display:"flex",alignItems:"center"}}>
//       <BiArrowBack size={30}/>
//       <header>
//       <h1>{profileDetail?.firstName}</h1>
//       <span>{userPosts.length}</span>
//       </header>
//       </div>
//       <div>
//         <div>
//         <img src={profileDetail?.profileAvatar} alt='profileAvtar'/>
//           <h1>{profileDetail?.firstName}</h1>
//           <p>{profileDetail?.username}</p>
//           <p>{profileDetail?.bio}</p>

//           {
//             currentLoggedInUser?<div>
//             <button onClick={()=>setEditProfileModal(!editProfileModal)}>Edit profile</button>
//             </div>:null
//           }

//         </div>
//         {
//           editProfileModal&&<EditProfileModal intialState={profileDetail} setEditProfileModal={setEditProfileModal}/>
//         }
//       </div>

//       <div>
//       </div>
//     </div>
//   )
// }
