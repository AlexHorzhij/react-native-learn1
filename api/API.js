import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { app } from '../fireBase/firebaseConfig';
const auth = getAuth(app);

export default {
  async userSignUp({ login: email, password }) {
    console.log('email, password: ', email, password);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { displayName, email: login, accessToken, uid } = user;
      return { displayName, login, accessToken, uid };
    } catch (error) {
      console.log(error);
    }
  },
  async userSignIn({ login: email, password }) {
    console.log('email, password: ', email, password);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const { displayName, email: login, accessToken, uid } = user;
      return { displayName, login, accessToken, uid };
    } catch (error) {
      console.log(error);
    }
  },
  async userSignOut() {
    try {
      console.log('logout');
      await signOut(auth);
      return null;
    } catch (error) {
      console.log(error);
    }
  },
  async authRefresh(setUser) {
    return onAuthStateChanged(auth, user => {
      if (user) {
        console.log('user: ', user);
        const uid = user.uid;
        setUser(user);
      } else {
        console.log('user is logout');
      }
    });
  },
};

// export const authRefresh = async () => {
//   return onAuthStateChanged(auth, user => {
//     if (user) {
//       console.log('user: ', user);
//       const uid = user.uid;
//       return user;
//     } else {
//       console.log('user is logout');
//     }
//   });
// };
