import axios from "axios";
import { getAllUserPostsHandler } from "../backend/controllers/PostController"

export const loadPostHandler=async(dispatch)=>{
    try {
        const response=await axios.get(`/api/posts`);
        dispatch({TYPE:"LOAD_POSTS",payLoad:response.data.posts})
    } catch (error) {
        console.error(error);
    }
}

export const likePostHandler=async(postId,encodedToken,dispatch)=>{
    console.log("like",postId,"postyid",encodedToken);
    try {
        const response=await axios.post(`/api/posts/like/${postId}`,{},{
            headers:{
            authorization:encodedToken
        }
    })
        console.log(response);
        dispatch({TYPE:"UPDATE_POST",payLoad:response.data.posts})
    } catch (error) {
        console.error(error);
    }
}

export const dislikeHandler=async(postId,encodedToken,dispatch)=>{
    try {
        const response=await axios.post(`/api/posts/dislike/${postId}`,{},{
            headers:{authorization:encodedToken}
        })
        console.log(response);
        dispatch({TYPE:"UPDATE_POST",payLoad:response.data.posts})
    } catch (error) {
        console.error(error);
    }
}