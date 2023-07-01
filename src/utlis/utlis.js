export const isLiked=(likes,userNameToFind)=>{
    return likes?.likedBy.find((user)=>user.username===userNameToFind)
}


export const userFeedPost=(posts,filterType,userFollowing,userInfo)=>{
    let finaluserfeed=posts.filter((post)=>userFollowing.includes(post.username)||post.username===userInfo.username);
    if(filterType==="TRENDING"){
        finaluserfeed=[...finaluserfeed].sort((a,b)=>b.likes.likeCount-a.likes.likeCount)
    }
    else{
        finaluserfeed=filterType==="OLDEST"?[...finaluserfeed].sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt)):[...finaluserfeed].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
    }
    return finaluserfeed
}

export const isBookMark=(userBookMark,postId)=>{
    const output= userBookMark?.find((_id)=>_id===postId);
    return output;
}


export const getUserId=(usernameToFind,users)=>{
    const outputId=users?.find(({username})=>username===usernameToFind);
    if(outputId)return outputId.username;
    return false;
}

export const searchUser=(users,searchedUser)=>{
    if(searchedUser.length==0){
        // console.log("hii",searchedUser.length);
        return [];
    }
    return users.filter(({username,firstName,lastName})=>username.includes(searchedUser)||firstName.includes(searchedUser)||lastName.includes(searchedUser));
}


export const suggestedUser=(users,userInfo)=>{
    const {username,following}=userInfo;
    return users.filter((user)=>user.username!==username&&!following.find((userFollow)=>userFollow.username===user.username));
}


export const getJoinedMonth=(datee)=>{
const month = datee?.toLocaleString('default', { month: 'long' });
const year = new Date(datee)?.getFullYear();

// console.log(typeof month,year,"hibi");
return ` ${year}`;

}


export const CreatePostEmpty=(PostContent)=>PostContent?.content?.length===0&&!PostContent?.postImage