import { auth } from '../fireBase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { refreshUser } from '../redux/auth/authSlice';

export const refreshUserHandler = async dispatch => {
  const foo = await onAuthStateChanged(auth, user => {
    if (user) {
      console.log('user: ', user);
      const { displayName, email, accessToken, uid, photoURL } = user;
      dispatch(refreshUser({ displayName, email, accessToken, uid, photoURL }));
    } else {
      console.log('user is logout');
    }
  });
};
