import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const RequireAuth = ({ children }) => {
  const { token } = useContext(AuthContext);

  return <>{token ? children : <Navigate to='/login' />}</>;
};

export default RequireAuth;
