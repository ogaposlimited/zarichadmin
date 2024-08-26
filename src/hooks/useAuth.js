import { useContext } from 'react';
import { AuthContext } from '../pages/context/AuthContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;
