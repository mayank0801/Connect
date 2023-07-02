import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const { loginHandler } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    loginHandler(loginInfo.email, loginInfo.password);
    setLoginInfo({ email: '', password: '' });
    navigate('/');
  };
  console.log(loginInfo);
  return (
    <div>
      <form onSubmit={(e) => submitHandler(e)}>
        <input
          type='text'
          value={loginInfo?.email}
          placeholder='Enter UserName'
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, email: e.target.value })
          }
          required
        />
        <input
          type='password'
          value={loginInfo?.password}
          placeholder='Enter PassWord'
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, password: e.target.value })
          }
          required
        />
        <button type='submit' value='Submit'>
          Login In
        </button>
      </form>
    </div>
  );
};

export default Login;
