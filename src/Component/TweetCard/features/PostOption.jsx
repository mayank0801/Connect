import React, { useContext, useState } from 'react';
import './PostOption.css';
import { PostContext } from '../../../context/PostContext';
import {
  deletePosthandler,
  followUser,
  loaduserHandler,
  unfollow,
} from '../../../services/postServices';
import { AuthContext } from '../../../context/AuthContext';
import { CreatePostModal } from '../../../features/CreatePostModal';
import {BiEdit} from "react-icons/bi";
import { AiFillDelete } from 'react-icons/ai';
export const PostOption = ({ post, postUser }) => {
  const {
    state: { users },
    dispatch,
  } = useContext(PostContext);
  const { token, updateUser, userInfo } = useContext(AuthContext);
  const isUserPost = post.username === userInfo.username;
  const [isPostModal, setPostModal] = useState(false);

  const isUserFollowing = userInfo.following.find(
    ({ username }) => username === post.username
  );
  const followuserId = users.find(({ username }) => username === post.username);

  return (
    <div className='userPost-optionConatiner'>
      <div className='userPost-option'>
        {isUserPost && (
          <>
          <span  onClick={() => setPostModal(!isPostModal)} >
          <BiEdit/>
            <p
              
             
            >
              Edit
            </p>
            </span>
            <span onClick={() => deletePosthandler(post._id, token, dispatch)}>
            <AiFillDelete/>
            <p
            >
              Delete
            </p>
            </span>

            <div className='editModal'>
              {isPostModal && (
                <CreatePostModal
                  setPostModal={setPostModal}
                  intialPostData={{
                    content: post.content,
                    postImage: post.postImage,
                  }}
                  post={post}
                />
              )}
            </div>
          </>
        )}

        {isUserFollowing && (
          <p
            className='userPost-option-text'
            onClick={() =>
              unfollow(followuserId._id, token, updateUser, loaduserHandler)
            }
          >
            Unfollow
          </p>
        )}

        {!isUserFollowing && !isUserPost && (
          <p
            className='userPost-option-text'
            onClick={() =>
              followUser(followuserId?._id, token, updateUser, loaduserHandler)
            }
          >
            Follow
          </p>
        )}
      </div>
    </div>
  );
};
