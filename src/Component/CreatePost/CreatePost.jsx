import { useContext, useState } from "react";
import { PostContext } from "../../context/PostContext";
import { AuthContext } from "../../context/AuthContext";
import {MdPermMedia} from "react-icons/md"
import {BsEmojiSmile} from "react-icons/bs"
import {RxCrossCircled} from "react-icons/rx"
import "./CreatePost.css";
import { cloudinaryImageFetcher, createPosthandler } from "../../services/postServices";



export default function CreatePost(){
    const {posts,dispatch,state:{filterType,users}}=useContext(PostContext);
    const {userInfo,token}=useContext(AuthContext);

    const [postContent,setpostContent]=useState({
        content:"",
        postImage:"",
    });



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
        let profileAvatarUrl=await cloudinaryImageFetcher(postContent.postImage);
        console.log(profileAvatarUrl,"p")
        await createPosthandler({...postContent,postImage:profileAvatarUrl.url},token,dispatch);
        setpostContent({ content:"",
        postImage:""});
    }



    return(
<div className="createPost">
<div className="profileImage">
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
        {postContent?.postImage&&
        <>
        <img width={"100%"} height={"100%"} src={postContent?.postImage} alt="postimage"/>
        <RxCrossCircled size={30} color="red" className="cross-icon" onClick={()=>setpostContent({...postContent,postImage:""})}/>
        </>
        }
    </div>
    <div className="post-icons">
        <div className="post-icons-item">
            <span>
            <MdPermMedia size={30}  fill="white" className="post-icons_item"  onChange={handleChange}/>
            <input type="file" name="postImage" style={{display:"none"}} onChange={handleChange} />
            </span>
            <span>
        <BsEmojiSmile fill="white" size={30}className="post-icons_item"/>
        </span>
        </div>
        <button className="postbtn" onClick={()=>postSubmitHandler()} disabled={!postContent?.content||!postContent?.postImage}>Post</button>
    </div>
</div>
</div>
    )
}
