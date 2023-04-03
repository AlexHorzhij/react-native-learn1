import { auth } from '../fireBase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { refreshUser } from '../redux/auth/authSlice';

export const refreshUserHandler = async dispatch => {
  const foo = await onAuthStateChanged(auth, user => {
    if (user) {
      const { displayName, email, accessToken, uid } = user;
      dispatch(refreshUser({ displayName, email, accessToken, uid }));
    } else {
      console.log('user is logout');
    }
  });
};
