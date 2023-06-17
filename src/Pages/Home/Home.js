import { useContext } from "react";
import Aside from "../../Component/Aside/Aside";
import { PostContext } from "../../context/PostContext";
import { TweetCard } from "../../Component/TweetCard/TweetCard";
import { AuthContext } from "../../context/AuthContext";

export default function Home(){
    const {posts,dispatch}=useContext(PostContext);
    const {userInfo,token}=useContext(AuthContext);

  
    const userFollowing=userInfo.following.map((user)=>user.username);
    // console.log(posts,userFollowing);
    const userFeed=posts.filter((post)=>userFollowing.includes(post.username)||post.username===userInfo.username);
    // console.log(userFeed,"userFeed");

    return(
        <div style={{display:"flex"}}>
            <aside>
                <Aside/>
            </aside>
            <div>
                {
                    userFeed.map((post)=><TweetCard key={post._id} post={post} userInfo={userInfo} token={token} dispatch={dispatch}/>)
                }
            </div>
        </div>
    )
}