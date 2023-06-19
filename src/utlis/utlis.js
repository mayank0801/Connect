export const isLiked=(likes,userNameToFind)=>{
    // console.log(likes,userNameToFind)
    return likes.likedBy.find((user)=>user.username===userNameToFind)
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