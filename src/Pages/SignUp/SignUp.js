import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css';
import ConnectLogo from '../../asset/ConnectLogo1.png';
const SignUp = () => {
  const { signupHandler } = useContext(AuthContext);
  const [signUpInfo, setSignUpInfo] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    profileAvatar:"https://png.pngtree.com/png-clipart/20210619/ourlarge/pngtree-instagram-social-media-men-round-glasses-avatar-png-image_3483988.jpg"
  });
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await signupHandler(signUpInfo);
      console.log(response);
      navigate('/');
    } catch {}
  };
  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='logo'>
          <span className='logo-item'>
            <img height={'50px'} width={'50px'} src={ConnectLogo} alt='logo'/>
            <span className='logo-text'>Connecting People</span>
          </span>
        </div>
        <h1 style={{ textAlign: 'center', color: 'blue' }}>Signup</h1>
        <div>
          <form onSubmit={submitHandler}>
            <label className='input-lable'>
              <span className='label-text'>FirstName*</span>
              <input
                type='text'
                placeholder='Mayank Kumar'
                onChange={(e) =>
                  setSignUpInfo({ ...signUpInfo, firstName: e.target.value })
                }
                required
              />
            </label>

            <label className='input-lable'>
              <span className='label-text'>LastName</span>
              <input
                type='text'
                placeholder='mayankkumar'
                onChange={(e) =>
                  setSignUpInfo({ ...signUpInfo, lastName: e.target.value })
                }
              />
            </label>

            <label className='input-lable'>
              <span className='label-text'>UserName*</span>
              <input
                type='text'
                placeholder='mayank@gmail.com'
                onChange={(e) =>
                  setSignUpInfo({ ...signUpInfo, username: e.target.value })
                }
                required
              />
            </label>

            <label className='input-lable'>
              <span className='label-text'>PassWord*</span>
              <input
                type='password'
                placeholder='***'
                onChange={(e) =>
                  setSignUpInfo({ ...signUpInfo, password: e.target.value })
                }
                required
              />
            </label>

            <label className='input-lable'>
              <span className='label-text'>Confirm-PassWord*</span>
              <input type='password' placeholder='****' required />
            </label>

            <div className='login-action'>
              <button type='submit' value='submit'>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
