import React, { useContext, useState } from 'react'

import {BsEmojiSmile} from "react-icons/bs"
import {GrGallery} from "react-icons/gr";
import {RxCrossCircled} from "react-icons/rx"
import { editPost } from '../services/postServices';
import { PostContext } from '../context/PostContext';
import { AuthContext } from '../context/AuthContext';

export const CreatePostModal = ({setPostModal,intialPostData,post}) => {
    console.log(intialPostData,"intial")
    const [postData,setPostData]=useState(intialPostData);
    const {token}=useContext(AuthContext)
    const {dispatch}=useContext(PostContext);

    const handleChange=(event)=>{
        const{name,value}=event.target;
        if(name==="postImage"){
        setPostData({...postData,postImage:URL.createObjectURL(event.target.files[0])});
        }
        else
        setPostData({...postData,[name]:value})
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`
    }

    const submitPostHandler=async()=>{
       
            await editPost(post._id,postData,token,dispatch)
            setPostModal(false);
    }
  return (
    <div style={{position:"fixed",top:"10%",backgroundColor:"red",right:"50%"}}>
        <div>
                    <div>
                        <img className="profile" src="" alt="profile"/>
                    </div>

                    <div >
                    <textarea
                    value={postData?.content}
                    name="content"
                    rows="1"
                    placeholder="What is Happening?!"
                    onChange={(e)=>handleChange(e)}
                    />
                    <div >
                    <img width={"100%"} src={postData?.postImage} height={"100%"} 
                    alt="postimage"/>
                    <RxCrossCircled size={30} color="red" />
                    </div>
                    <div >
                        <label>
                            <GrGallery size={30} onChange={handleChange}/>
                            <input type="file" name="postImage" style={{display:"none"}} onChange={handleChange}/>
                        </label>
                        <BsEmojiSmile size={30}/>
                        <button onClick={()=>submitPostHandler()}>Post</button>
                        <button onClick={()=>setPostModal(false)}>Cancel</button>
                    </div>
                    </div>
                </div>
    </div>
  )
}
