import React, { useContext, useState } from 'react';

import { BsEmojiSmile } from 'react-icons/bs';
import { GrGallery } from 'react-icons/gr';
import { RxCrossCircled } from 'react-icons/rx';
import { cloudinaryImageFetcher, editPost } from '../services/postServices';
import { PostContext } from '../context/PostContext';
import { AuthContext } from '../context/AuthContext';
import EmojiPicker from 'emoji-picker-react';
import { useRef } from 'react';

export const CreatePostModal = ({ setPostModal, intialPostData, post }) => {
  console.log(intialPostData, 'intial');
  const [postData, setPostData] = useState(intialPostData);
  const { token, userInfo } = useContext(AuthContext);
  const { dispatch } = useContext(PostContext);

  const [cloudnaryImage, setCloudnaryImage] = useState('');
  const [emojiModal, setEmojiModal] = useState(false);
  const emojiRef = useRef(null);
  const handleChange = (event) => {
    event.stopPropagation();
    const { name, value } = event.target;
    if (name === 'postImage') {
      setCloudnaryImage(event.target.files[0]);
      setPostData({
        ...postData,
        postImage: URL.createObjectURL(event.target.files[0]),
      });
    } else setPostData({ ...postData, [name]: value });
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const submitPostHandler = async () => {
    console.log(post?.id,"pppp")
    let profileAvatarUrl = '';
    if (postData?.postImage)
      profileAvatarUrl = await cloudinaryImageFetcher(cloudnaryImage);
    console.log(profileAvatarUrl,"pppp")
    await editPost(post?._id, {...postData,postImage:profileAvatarUrl.url}, token, dispatch);
    setPostModal(false);
  };
  const inputRef = useRef(null);
  const handleClick = (e) => {
    e.stopPropagation();
    inputRef.current.click();
  };

  return (
    <div className='create-modal'>
      <div className='' style={{ display: 'flex', gap: '5px' }}>
        <div>
          <img
            className='profileAvatar'
            src={userInfo?.profileAvatar}
            alt='profile'
          />
        </div>

        <div className='createPost-modal-input'>
          <textarea
            value={postData?.content}
            name='content'
            rows='1'
            placeholder='What is Happening?!'
            onChange={(e) => handleChange(e)}
          />
          <div>
            {postData?.postImage && (
              <>
                <img
                  width={'100%'}
                  src={postData?.postImage}
                  height={'100%'}
                  alt='postimage'
                />
                <RxCrossCircled size={30} color='red' onClick={()=>{
                  setPostData({...postData,postImage:""})
                  setCloudnaryImage("");
                }
                }/>
              </>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '1rem',
            }}
          >
            <label>
              <GrGallery size={30} 
            //   onClick={handleClick} 
              />
              <input
                type='file'
                name='postImage'
                style={{ display: 'none' }}
                ref={inputRef}
                onChange={handleChange}
              />
            </label>
            <label>
              <BsEmojiSmile
                fill='white'
                size={30}
                className='post-icons_item'
                onClick={() => setEmojiModal(!emojiModal)}
              />
              {emojiModal && (
                <div
                  style={{ position: 'absolute', zIndex: '5' }}
                  ref={emojiRef}
                >
                  <EmojiPicker
                    theme='dark'
                    onEmojiClick={(emoji, event) => {
                      console.log(emoji.emoji);
                      setPostData({
                        ...postData,
                        content: postData.content + emoji.emoji,
                      });
                    }}
                  />
                </div>
              )}
            </label>

            <span>
              <button onClick={() => setPostModal(false)}>Cancel</button>
              <button onClick={() => submitPostHandler()}>Post</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
