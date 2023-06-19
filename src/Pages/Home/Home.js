import { useContext, useState } from "react";
import Aside from "../../Component/Aside/Aside";
import { PostContext } from "../../context/PostContext";
import { TweetCard } from "../../Component/TweetCard/TweetCard";
import { AuthContext } from "../../context/AuthContext";
import {GrGallery} from "react-icons/gr"
import {BsEmojiSmile} from "react-icons/bs"
import {RxCrossCircled} from "react-icons/rx"
import {v4 as uuid} from "uuid"
import  "./Home.css"
import { createPosthandler } from "../../services/postServices";
import { SortBar } from "../../Component/SortBar/SortBar";
import { userFeed, userFeedPost } from "../../utlis/utlis";
export default function Home(){
    const {posts,dispatch,state:{filterType}}=useContext(PostContext);
    const {userInfo,token}=useContext(AuthContext);
    const [postContent,setpostContent]=useState({
        content:"",
        postImage:"",
    });
    const userFollowing=userInfo.following.map((user)=>user.username);
    const userFeed=userFeedPost(posts,filterType,userFollowing,userInfo)

    const handleChange=(event)=>{
        const{name,value}=event.target;
        if(name==="postImage"){
        setpostContent({...postContent,postImage:URL.createObjectURL(event.target.files[0])});
        }
        else
        setpostContent({...postContent,[name]:value})
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`
    }
    const postSubmitHandler=async()=>{
        await createPosthandler(postContent,token,dispatch);
        setpostContent({ content:"",
        postImage:""});
    }
    return(
        <div className="home-Container">
            <aside className="aside">
                <Aside/>  
            </aside>
            <div className="main-content">
                <h3 className="title">Home</h3>
                <div className="createPost">
                    <div className="userImage">
                        <img className="profile" src={userInfo?.profileAvatar} alt="profile"/>
                    </div>

                    <div className="postContent">

                    <textarea
                    className={postContent.content?"postContent":"placeholder"} 
                    name="content"
                    rows="1"
                    value={postContent?.content}
                    onChange={handleChange}
                    placeholder="What is Happening?!"
                    />
                    <div className="post-img">
                    {postContent?.postImage&&<>
                    <img width={"100%"} height={"100%"} src={postContent?.postImage} alt="postimage"/>
                    <RxCrossCircled size={30} color="red" className="cross-icon" onClick={()=>setpostContent({...postContent,postImage:""})}/>
                    </>
}
                    </div>
                    <div className="post-icons">
                        <label>
                        <GrGallery size={30} className="post-icons_item"  onChange={handleChange}/>
                        <input type="file" name="postImage" style={{display:"none"}} onChange={handleChange} />
                        </label>
                        <BsEmojiSmile size={30}className="post-icons_item"/>
                        <button className="postbtn" onClick={()=>postSubmitHandler()}>Post</button>
                    </div>
                    </div>




                </div>

                <div className="filter-Tweet">
                    <SortBar/>
                </div>






                {
                    userFeed.map((post)=><TweetCard key={post._id} post={post} userInfo={userInfo} token={token} dispatch={dispatch}/>)
                }
            </div>
            <div className="aside-right">
                Suggested User
            </div>
        </div>
    )
}