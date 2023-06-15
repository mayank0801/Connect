import axios from "axios";
import { getAllUserPostsHandler } from "../backend/controllers/PostController"

export const loadPostHandler=async(dispatch)=>{
    try {
        const response=await axios.get(`/api/posts`);
        console.log(response);
        dispatch({TYPE:"LOAD_POSTS",payLoad:response.data.posts})
    } catch (error) {
        console.error(error);
    }
}