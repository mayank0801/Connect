import React, { useContext, useEffect, useState } from 'react';
import GifPicker from 'gif-picker-react';
import { BsEmojiSmile } from 'react-icons/bs';
import { MdPermMedia } from 'react-icons/md';
import { RxCrossCircled } from 'react-icons/rx';
import { cloudinaryImageFetcher, cloudinaryVideoFetcher, editPost } from '../services/postServices';
import { PostContext } from '../context/PostContext';
import { AuthContext } from '../context/AuthContext';
import EmojiPicker from 'emoji-picker-react';
import { useRef } from 'react';
import { AiOutlineGif } from 'react-icons/ai';
import { useClickOutside } from '../hook/clickOutside';
import { isMediaFileLarge, isVideo } from '../utlis/utlis';

export const CreatePostModal = ({ setPostModal, intialPostData, post }) => {
  console.log(intialPostData, 'intial');
  const [postData, setPostData] = useState(intialPostData);
  const { token, userInfo } = useContext(AuthContext);
  const { dispatch } = useContext(PostContext);

  const [cloudinaryMedia, setcloudinaryMedia] = useState('');
  const [emojiModal, setEmojiModal] = useState(false);
  const [gifModal,setGifModal]=useState(false);
  const gifRef=useRef(null);
  const emojiRef = useRef(null);
  const handleChange = (event) => {


    const { name, value } = event.target;
    console.log(name,value,"event.target")
    if (name === 'postImage') {
    if(!value){return ;}
     else if(isVideo(event.target.files[0])){
        console.log("Video","event.target");
        if(!isMediaFileLarge(event.target.files[0])) 
        {
        return null;
        }
        else{
        setPostData({
          ...postData,
          postVideo:URL.createObjectURL(event.target.files[0])
        })
        setcloudinaryMedia(event.target.files[0]);
      }
      }
      else {
        setPostData({
          ...postData,
          postImage: URL.createObjectURL(event.target.files[0]),
        });
        setcloudinaryMedia(event.target.files[0]);
      }
    
      
    } else setPostData({ ...postData, [name]: value });
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;





      };

   

  const submitPostHandler = async () => {
    console.log(post?.id, 'pppp');
    let postMedia = '';
    if (postData?.postImage)
    postMedia = await cloudinaryImageFetcher(cloudinaryMedia);
    else if(postData?.postVideo){
      postMedia=await cloudinaryVideoFetcher(cloudinaryMedia);
    }
      console.log(postMedia, 'pppp');
    await editPost(
      post?._id,
      { ...postData, 
        postImage: postData.postImage ? postMedia?.url : '',
        postVideo:postData.postVideo?postMedia?.url:''},
      token,
      dispatch
    );
    setPostModal(false);
  };
  const inputRefFile = useRef(null);
  const inputRef=useRef();
  const handleClick = (e) => {
    e.stopPropagation();
    inputRefFile.current.click();
  };

  useClickOutside(inputRef,setGifModal);
  useClickOutside(inputRef,setEmojiModal);
  // useClickOutside(inputRef)
  const textareaRef=useRef();
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  return (
    <div className='create-modal' ref={inputRef}>
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
            ref={textareaRef}
            placeholder='What is Happening?!'
            onChange={(e) => handleChange(e)}
          />
          <div>
            {postData?.postImage && (
              <>
                <img
                  className='edit-post-img'
                  src={postData?.postImage}
                  
                  alt='postimage'
                />
                <RxCrossCircled
                  size={30}
                  color='red'
                  style={{position:'absolute',right:"3%",top:"30%"}}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPostData({ ...postData, postImage: '' });
                    setcloudinaryMedia('');
                  }}
                />
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
            <div className='edit-options'>
            <label>
            <MdPermMedia
                size={30}
                fill='white'
                className='icon'
                onClick={handleClick}
              />
              
              <input
                type='file'
                name='postImage'
                style={{ display: 'none' }}
                ref={inputRefFile}
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
                  ref={inputRef}
                >
                  <EmojiPicker
                    theme='dark'
                    onEmojiClick={(emoji, event) => {
                      console.log(emoji.emoji);
                      event.stopPropagation();
                      setPostData({
                        ...postData,
                        content: postData.content + emoji.emoji,
                      });
                    }}
                  />
                </div>
              )}
            </label>

            <label>
            <AiOutlineGif size={30} fill='white' stroke='white' onClick={()=>setGifModal(!gifModal)} />
              <div className='gif-wrapper-modal' ref={inputRef}>
                {gifModal&&<GifPicker tenorApiKey={'AIzaSyC3f2te0YYy3yg9e-dEGdxou0J52mOWsgo'}
                onGifClick={(TenorImage)=>
                  {
              
                    setPostData({...postData,postImage:TenorImage.url})
                    setcloudinaryMedia(TenorImage.url)
                  }}
                />}
              </div>
            </label>
            </div>
            
            <span>
              <button className='btn btn-cancel' onClick={() => setPostModal(false)}>Cancel</button>
              <button className="btn btn-Edit" onClick={() => submitPostHandler()}>Post</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
