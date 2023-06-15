import { useContext } from "react";
import Aside from "../../Component/Aside/Aside";
import { PostContext } from "../../context/PostContext";

export default function Home(){
    const {posts,x}=useContext(PostContext);
    console.log(posts)
    return(
        <div style={{display:"flex"}}>
            <aside>
                <Aside/>
            </aside>

            <div>
                {
                    posts.map((post)=>
                    <>

                    </>)
                }
            </div>
        </div>
    )
}