import { useContext } from "react";
import Aside from "../../Component/Aside/Aside";
import { PostContext } from "../../context/PostContext";
import { TweetCard } from "../../Component/TweetCard/TweetCard";

export default function Home(){
    const {posts}=useContext(PostContext);
    console.log(posts)
    return(
        <div style={{display:"flex"}}>
            <aside>
                <Aside/>
            </aside>

            <div>
                {
                    posts.map((post)=><TweetCard key={post._id} post={post}/>)
                }
            </div>
        </div>
    )
}