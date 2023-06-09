import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { PostContext } from '../context/PostContext';

export const loadPostHandler = async (dispatch) => {
  try {
    const response = await axios.get(`/api/posts`);
    dispatch({ TYPE: 'LOAD_POSTS', payLoad: response.data.posts });
  } catch (error) {
    console.error(error);
  }
};
export const loaduserHandler = async (dispatch) => {
  try {
    const response = await axios.get(`/api/users`);
    dispatch({ TYPE: 'LOAD_USER', payLoad: response.data.users });
  } catch (error) {
    console.log(error);
  }
};

export const likePostHandler = async (_id, encodedToken, dispatch) => {
  try {
    const response = await axios.post(
      `/api/posts/like/${_id}`,
      {},
      {
        headers: { authorization: encodedToken },
      }
    );
    dispatch({ TYPE: 'UPDATE_POST', payLoad: response.data.posts });
    toast.success('Post Liked');

  } catch (error) {
    toast.error('SomeThing Went Wrong');

  }
};

export const dislikeHandler = async (postId, encodedToken, dispatch) => {

  try {
    const response = await axios.post(
      `/api/posts/dislike/${postId}`,
      {},
      {
        headers: { authorization: encodedToken },
      }
    );
    dispatch({ TYPE: 'UPDATE_POST', payLoad: response.data.posts });
    toast.success('Post Disliked');
  } catch (error) {
    toast.error('SomeThing Went Wrong');
  }
};

export const createPosthandler = async (
  post,
  encodedToken,
  dispatch,
  setLoading
) => {
  try {
    setLoading(true);
    const response = await axios.post(
      `/api/posts/`,
      { postData: post },
      { headers: { authorization: encodedToken } }
    );
    if (response) {
      dispatch({ TYPE: 'UPDATE_POST', payLoad: response.data.posts });
    }
    toast.success('Post Added SuccessFully');
    setLoading(false);
  } catch (error) {
    toast.error('SomeThing Went Wrong!.Try Again After Some Time');
  }
};

export const deletePosthandler = async (postId, encodedToken, dispatch) => {
  try {
    const response = await axios.delete(`/api/posts/${postId}`, {
      headers: { authorization: encodedToken },
    });
    dispatch({ TYPE: 'UPDATE_POST', payLoad: response.data.posts });
    toast.success('Post Deleted');
  } catch (error) {
    toast.error('SomeThing Went Wrong!.Try Again After Some Time');
  }
};

// export const followUserHandler = async (
//   followUserId,
//   encodedToken,
//   dipatch
// ) => {
//   try {
//     const response = await axios.post(
//       `/api/users/follow/${followUserId}`,
//       {},
//       { headers: { authorization: encodedToken } }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

export const unfollow = async (
  followUserId,
  encodedToken,
  updateUser,
  loaduserHandler
) => {
  try {
    const response = await axios.post(
      `/api/users/unfollow/${followUserId}`,
      {},
      { headers: { authorization: encodedToken } }
    );

    updateUser(response.data.user);
    await loaduserHandler();
    toast.success('User Unfollowed');
  } catch (error) {

    toast.error('SomeThing Went Wrong!.Try Again After Some Time');
  }
};

export const bookmark = async (
  postId,
  encodedToken,
  updateBookMark,
  dispatch
) => {
  try {
    const response = await axios.post(
      `/api/users/bookmark/${postId}`,
      {},
      { headers: { authorization: encodedToken } }
    );
    toast.success('Added to BookMark');
    updateBookMark(response.data.bookmarks);
    dispatch({ type: 'USERBOOKMARK_POST', payLoad: response.data.bookmarks });
  } catch (error) {
    toast.error('SomeThing Went Wrong!.Try Again After Some Time');
  }
};

export const removeBookMark = async (postId, encodedToken, updateBookMark) => {
  try {
    const response = await axios.post(
      `/api/users/remove-bookmark/${postId}`,
      {},
      { headers: { authorization: encodedToken } }
    );
    updateBookMark(response.data.bookmarks);
    toast.success('Remove From BookMark');
  } catch (error) {
    toast.error('SomeThing Went Wrong!.Try Again After Some Time');
  }
};

export const editPost = async (postId, postData, encodedToken, dispatch) => {
  try {
    const response = await axios.post(
      `/api/posts/edit/${postId}`,
      { postData },
      { headers: { authorization: encodedToken } }
    );
    dispatch({ TYPE: 'UPDATE_POST', payLoad: response.data.posts });
    toast.success('Post Updated');
  } catch (error) {
    toast.error('SomeThing Went Wrong!.Try Again After Some Time');
  }
};

export const followUser = async (
  followUserId,
  encodedToken,
  updateUser,
  loaduserHandler,
  setLoading
) => {
  try {
    setLoading(true);
    const response = await axios.post(
      `/api/users/follow/${followUserId}`,
      {},
      { headers: { authorization: encodedToken } }
    );
    localStorage.setItem('userInfo', JSON.stringify(response.data.user));
    updateUser(response.data.user);
    await loaduserHandler();
    toast.success('User Followed');
  } catch (error) {
    toast.error('SomeThing Went Wrong!.Try Again After Some Time');
  } finally {
    setLoading(false);
  }
};

export const addComment = async (
  postId,
  commentData,
  encodedToken,
  dispatch
) => {
  try {
    const response = await axios.post(
      `/api/comments/add/${postId}`,
      { commentData },
      { headers: { authorization: encodedToken } }
    );
    dispatch({ TYPE: 'UPDATE_POST', payLoad: response.data.posts });
    toast.success('Comment Added');
  } catch (error) {
    toast.error('SomeThing Went Wrong!.Try Again After Some Time');
  }
};

export const deleteComment = async (
  postId,
  commentId,
  encodedToken,
  dispatch
) => {
  try {
    const response = await axios.post(
      `/api/comments/delete/${postId}/${commentId}`,
      {},
      { headers: { authorization: encodedToken } }
    );
    dispatch({ TYPE: 'UPDATE_POST', payLoad: response.data.posts });
    toast.success('Comment Deleted');
  } catch (error) {
    toast.error('SomeThing Went Wrong!.Try Again After Some Time');
  }
};

export const editComment = async (
  postId,
  commentId,
  commentData,
  encodedToken,
  dispatch
) => {
  try {
    const response = await axios.post(
      `/api/comments/edit/${postId}/${commentId}`,
      { commentData },
      { headers: { authorization: encodedToken } }
    );
    dispatch({ TYPE: 'UPDATE_POST', payLoad: response.data.posts });
    toast.success('Edited Comment SuccessFully');
  } catch (error) {
    toast.error('SomeThing Went Wrong!.Try Again After Some Time');
  }
};

export const updateUserhandler = async (userData, encodedToken, updateUser) => {
  try {
    const response = await axios.post(
      `/api/users/edit`,
      { userData },
      { headers: { authorization: encodedToken } }
    );
    localStorage.setItem('userInfo', JSON.stringify(response.data.user));
    updateUser(response.data.user);
    await loaduserHandler();
    toast.success('Update Profile SuccessFully');
  } catch (error) {
    toast.error('SomeThing Went Wrong!.Try Again After Some Time');
  }
};

export const cloudinaryImageFetcher = async (mediaNewPost) => {
  const dataForCloudinary = new FormData();
  dataForCloudinary.append('file', mediaNewPost);
  dataForCloudinary.append('upload_preset', 'connect');
  dataForCloudinary.append('cloud_name', 'ditqnzlil');
  const urlToReturn = fetch(
    'https://api.cloudinary.com/v1_1/ditqnzlil/image/upload',
    {
      method: 'post',
      body: dataForCloudinary,
    }
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => console.log(e));

  return urlToReturn;
};


export const cloudinaryVideoFetcher=async(mediaNewPost)=>{
const dataForCloudinary=new FormData();
dataForCloudinary.append('file',mediaNewPost);
dataForCloudinary.append('upload_preset','connect');
dataForCloudinary.append('cloud_name','ditqnzlil');
const urlToReturn=fetch(
  'https://api.cloudinary.com/v1_1/ditqnzlil/video/upload',
  {
    method:'post',
    body:dataForCloudinary,
  }
)
.then((res)=>res.json())
.then((data)=>data)
.catch((e)=>console.log(e,"videoUrl"));

return urlToReturn
}
