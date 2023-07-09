import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';

import reducer, { IntialState } from '../Reducer/postReducer';
import { loadPostHandler, loaduserHandler } from '../services/postServices';
import { AuthContext } from './AuthContext';

export const PostContext = createContext();
export default function PostContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, IntialState);
  const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);



  async function fetchData() {
    try {
      await loadPostHandler(dispatch);
      await loaduserHandler(dispatch);
    } catch (error) {
      toast.error('SomeThing Went Wrong');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [userInfo]);
  return (
    <div>
      <PostContext.Provider
        value={{ posts: state.post, dispatch, state, setLoading, loading }}
      >
        {children}
      </PostContext.Provider>
    </div>
  );
}
