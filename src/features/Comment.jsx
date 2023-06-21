import React from 'react'
import { useState } from 'react'
import { addComment } from '../services/postServices';
import { useConst } from '@chakra-ui/react';
import { useContext } from 'react';
import { PostContext } from '../context/PostContext';
import { AuthContext } from '../context/AuthContext';

export const Comment = ({post}) => {

    const [commentContent,setcommentContent]=useState("");
    const {token}=useContext(AuthContext)
    const {dispatch}=useContext(PostContext)
    
    const handleChange=(event)=>{
        setcommentContent(event.target.value)
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`
    }
    const handleSubmit=()=>{
        console.log(post._id,commentContent,token,dispatch,"check1")
        addComment(post._id,commentContent,token,dispatch)
        setcommentContent("");
    }

  return (

    <div >
                    <div >
                        <img  alt="profile"/>
                    </div>

                    <div >
                    <textarea
                    style={{border:"1px solid black"}}
                    name="content"
                    rows="1"
                    value={commentContent}
                    onChange={(e)=>handleChange(e)}
                    placeholder="POst a Reply"
                    />
                    <button onClick={()=>handleSubmit()}>Post</button>
            </div>
            
            </div>
  )
}
