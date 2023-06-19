import axios from "axios";

export const loadPostHandler=async(dispatch)=>{
    try {
        const response=await axios.get(`/api/posts`);
        dispatch({TYPE:"LOAD_POSTS",payLoad:response.data.posts})
    } catch (error) {
        console.error(error);
    }
}



export const likePostHandler=async(_id,encodedToken,dispatch)=>{
    try {
        const response=await axios.post(
            `/api/posts/like/${_id}`,
            {},
            {
            headers:{authorization:encodedToken,}
    }
    )
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

export const createPosthandler=async(post,encodedToken,dispatch)=>{
    console.log(typeof post,encodedToken)
    try {
        const response=await axios.post(`/api/posts/`,{postData:post},{headers:{authorization:encodedToken}})
        if(response){
            dispatch({TYPE:"UPDATE_POST",payLoad:response.data.posts})
        }
    } catch (error) {
        console.error(error)
    }
}