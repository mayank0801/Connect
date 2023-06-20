import axios from "axios";

export const loadPostHandler=async(dispatch)=>{
    try {
        const response=await axios.get(`/api/posts`);
        dispatch({TYPE:"LOAD_POSTS",payLoad:response.data.posts})
    } catch (error) {
        console.error(error);
    }
}
export const loaduserHandler=async(dispatch)=>{
    try {
        const response=await axios.get(`/api/users`);
        dispatch({TYPE:"LOAD_USER",payLoad:response.data.users});
    } catch (error) {
        console.log(error)
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
        dispatch({TYPE:"UPDATE_POST",payLoad:response.data.posts})
    } catch (error) {
        console.error(error);
    }
}

export const createPosthandler=async(post,encodedToken,dispatch)=>{
    try {
        const response=await axios.post(`/api/posts/`,{postData:post},{headers:{authorization:encodedToken}})
        if(response){
            dispatch({TYPE:"UPDATE_POST",payLoad:response.data.posts})
        }
    } catch (error) {
        console.error(error)
    }
}

export const deletePosthandler=async(postId,encodedToken,dispatch)=>{
    console.log("Delete",postId,encodedToken)
    try {
        const response=await axios.delete(`/api/posts/${postId}`,{headers:{authorization: encodedToken}});
        console.log(response,"delete");
        dispatch({TYPE:"UPDATE_POST",payLoad:response.data.posts})
    } catch (error) {
        console.log(error)
        
    }
}

export const followUserHandler=async(followUserId,encodedToken,dipatch)=>{
    try {
        const response=await axios.post(`/api/users/follow/${followUserId}`,{},{headers:{authorization:encodedToken}});
    } catch (error) {
        console.log(error)
        
    }
}


export const unfollow=async(followUserId,encodedToken,updateUser,loaduserHandler)=>{
    try {
       const response=await axios.post(`/api/users/unfollow/${followUserId}`,{},{headers:{authorization:encodedToken}}) 
       localStorage.setItem("userInfo",JSON.stringify(response.data.user));
       updateUser(response.data.user);
       await loaduserHandler();

    } catch (error) {
        console.log(error)
    }
}


export const bookmark=async(postId,encodedToken,updateBookMark)=>{
    try {
        const response=await axios.post(`/api/users/bookmark/${postId}`,{},{headers:{authorization:encodedToken}});
        updateBookMark(response.data.bookmarks)
        console.log(response);
    } catch (error) {
        
    }
}

export const removeBookMark=async(postId,encodedToken,updateBookMark)=>{
    try {
      const response=await axios.post(`/api/users/remove-bookmark/${postId}`,{},{headers:{authorization:encodedToken}})  
        updateBookMark(response.data.bookmarks);
        console.log(response);
    } catch (error) {
        
    }
}