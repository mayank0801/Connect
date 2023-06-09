import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, json, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const usertoken = JSON.parse(localStorage?.getItem('userToken'));
  const userInfoo = JSON.parse(localStorage?.getItem('userInfo'));

  const [token, setToken] = useState(usertoken);
  const [userInfo, setUserInfo] = useState(userInfoo);
  const [userBookMark, setuserBookMark] = useState([]);
  const navigate = useNavigate();

  const updateUser = (updatedUser) => {

    localStorage.setItem('userInfo', JSON.stringify(updatedUser));
    setUserInfo(updatedUser);
  };
  const updateBookMark = (updatedBookMark) => {
    setuserBookMark(updatedBookMark);
  };
  const loginHandler = async (username, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password,
      });
      localStorage.setItem(
        'userToken',
        JSON.stringify(response.data.encodedToken)
      );
      localStorage.setItem('userInfo', JSON.stringify(response.data.foundUser));
      setToken(response.data.encodedToken);
      setUserInfo(response.data.foundUser);
      toast.success(`Welcome Back ${response.data.foundUser.firstName}`);
      return response;
    } catch (e) {
      toast.error('SomeThing Went Wrong');
    }
  };

  const signupHandler = async (signUpInfo) => {
    try {
      const response = await axios.post('/api/auth/signup', {
        ...signUpInfo,
      });

      localStorage.setItem(
        'userToken',
        JSON.stringify(response.data.encodedToken)
      );
      localStorage.setItem(
        'userInfo',
        JSON.stringify(response.data.createdUser)
      );
      setToken(response.data.encodedToken);
      setUserInfo(response.data.createdUser);
      toast.success(
        `Welcome To Connect ${response?.data?.createdUser?.firstName}`
      );
      return response;
    } catch (error) {
      toast.error('Something Went Wrong');
    }
  };

  const getBookmark = async () => {
    try {
      const response = await axios.get(`/api/users/bookmark`, {
        headers: { authorization: token },
      });
      setuserBookMark(response.data.bookmarks);
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    setuserBookMark([]);
    navigate('/');
    toast.success('Logout SuccesFull');
  };

  useEffect(() => {
    getBookmark();
  }, [userInfo]);

  return (
    <AuthContext.Provider
      value={{
        loginHandler,
        signupHandler,
        token,
        userInfo,
        updateUser,
        setUserInfo,
        updateBookMark,
        userBookMark,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
