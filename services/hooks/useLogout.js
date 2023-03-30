import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/authSlice';
import API from '../../api/API';

export const useLogout = () => {
  const dispatch = useDispatch();

  return async () => {
    await API.userSignOut();
    dispatch(logOut());
  };
};
