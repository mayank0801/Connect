import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer, { IntialState } from '../Reducer/postReducer';
import { loadPostHandler, loaduserHandler } from '../services/postServices';
import { AuthContext } from './AuthContext';

export const PostContext = createContext();
export default function PostContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, IntialState);
  const { userInfo } = useContext(AuthContext);

  // const {userInfo}=useContext(AuthContext)

  useEffect(() => {
    loadPostHandler(dispatch);
    loaduserHandler(dispatch);
  }, [userInfo]);
  return (
    <div>
      <PostContext.Provider value={{ posts: state.post, dispatch, state }}>
        {children}
      </PostContext.Provider>
    </div>
  );
}
