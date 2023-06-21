import React from 'react'
import "./Feature.css"
import {BsEmojiSmile} from "react-icons/bs"
import {GrGallery} from "react-icons/gr";
import {RxCrossCircled} from "react-icons/rx"
export const EditPostModal = () => {
  return (
    <div>
         <div className="createPost ">
                    <div className="userImage">
                        <img className="profile" src="" alt="profile"/>
                    </div>

                    <div className="postContent">

                    <textarea
                    // className={"postContent""placeholder"} 
                    name="content"
                    rows="1"
                    // value={postContent?.content}
                    // onChange={handleChange}
                    placeholder="What is Happening?!"
                    />
                    <div className="post-img">
                    {/* {postContent?.postImage&&<> */}
                    <img width={"100%"} height={"100%"} 
                    // src={postContent?.postImage} 
                    alt="postimage"/>
                    <RxCrossCircled size={30} color="red" className="cross-icon" 
                    // onClick={()=>setpostContent({...postContent,postImage:""})}
                    />
                    {/* </> */}
{/* } */}
                    </div>
                    <div className="post-icons">
                        <label>
                        <GrGallery size={30} className="post-icons_item" 
                        //  onChange={handleChange}
                         />
                        <input type="file" name="postImage" style={{display:"none"}}
                        //  onChange={handleChange}
                          />
                        </label>
                        <BsEmojiSmile size={30}className="post-icons_item"/>
                        <button className="postbtn" 
                        // onClick={()=>postSubmitHandler()}
                        >Post</button>
                    </div>
                    </div>




                </div>
    </div>
  )
}
