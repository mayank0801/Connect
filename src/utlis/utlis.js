export const isLiked=(likes,userNameToFind)=>{
    // console.log(likes,userNameToFind)
    return likes.likedBy.find((user)=>user.username===userNameToFind)
}