import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { refreshUser } from '../redux/auth/authSlice';
import useRouter from '../router';
import { ScrollView } from 'react-native-gesture-handler';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../fireBase/firebaseConfig';
const auth = getAuth(app);

export default function ScreensWrapper() {
  //   const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.auth);
  console.log('uid: ', uid);

  const routing = useRouter(uid);

  onAuthStateChanged(auth, user => {
    if (user) {
      //   setUser(user.uid);
      const userData = {
        uid: user.uid,
        login: user.email,
        name: user.displayName,
        token: user.refreshToken,
      };
      dispatch(refreshUser(userData));
    } else {
      console.log('user is logout');
    }
  });

  //   useEffect(() => {
  //     console.log('user: ', user);

  //   }, [user]);

  return (
    <>
      {routing}
      <StatusBar style="auto" />
    </>
  );
}
