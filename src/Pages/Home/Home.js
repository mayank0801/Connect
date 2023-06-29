import { useContext, useState } from "react";
import Aside from "../../Component/Aside/Aside";
import { PostContext } from "../../context/PostContext";
import { TweetCard } from "../../Component/TweetCard/TweetCard";
import { AuthContext } from "../../context/AuthContext";
import {GrGallery} from "react-icons/gr"
import {BsEmojiSmile} from "react-icons/bs"
import {RxCrossCircled} from "react-icons/rx"
import  "./Home.css"
import { cloudinaryImageFetcher, createPosthandler } from "../../services/postServices";
import { SortBar } from "../../Component/SortBar/SortBar";
import { userFeed, userFeedPost } from "../../utlis/utlis";
import { SearchUser } from "../../Component/SearchUser/SearchUser";
import { AsideRight } from "../../Component/AsideRight/AsideRIght";
import CreatePost from "../../Component/CreatePost/CreatePost";
export default function Home(){
    const {posts,dispatch,state:{filterType,users}}=useContext(PostContext);
    const {userInfo,token}=useContext(AuthContext);
   
    const userFollowing=userInfo?.following.map((user)=>user.username);
    const userFeed=userFeedPost(posts,filterType,userFollowing,userInfo)


    return(
        <div className="home-Container">
            <aside className="aside">
                <Aside/>  
            </aside>
            <div className="main-content">
                <div></div>
                <h3 className="title">Home</h3>

                    <>
                    <CreatePost/>
                    </>

               
                <div className="filter-Tweet">
                    <SortBar/>
                </div>





                <div style={{width:"100%"}}>
                {
                    userFeed.map((post)=><TweetCard key={post._id} post={post} userInfo={userInfo} token={token} dispatch={dispatch}/>)
                }
                </div>
            </div>
            <div className="aside-right">
                Suggested User
                <AsideRight/>
            </div>
        </div>
    )
}