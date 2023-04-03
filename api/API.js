import { v4 } from 'uuid';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';

// import { refreshUser } from '../redux/auth/authSlice';

import { ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from '../fireBase/firebaseConfig';

export default {
  async userSignUp({ name, email, password }) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      const data = await auth.currentUser;
      let userData = {};
      if (user) {
        const { displayName, email, uid } = user;
        userData = { displayName, email, uid };
      }

      return userData;
    } catch (error) {
      console.log(error);
    }
  },
  async userSignIn({ email, password }) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      let userData = {};
      if (user) {
        const { displayName, email, uid } = user;
        userData = { displayName, email, uid };
      }
      return userData;
    } catch (error) {
      console.log(error);
    }
  },
  async userSignOut() {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      console.log(error);
    }
  },
  // async authRefresh(dispatch) {
  //   const foo = await onAuthStateChanged(auth, user => {
  //     console.log('user: ', user);
  //     if (user) {
  //       const { displayName, email, accessToken, uid } = user;
  //       const userData = { displayName, email, accessToken, uid };
  //       dispatch(refreshUser(userData));
  //     } else {
  //       console.log('user is logout');
  //     }
  //   });
  // },
  async saveInStorage(file) {
    const name = v4();
    const storageRef = ref(storage, `image/${name}`);

    const foto = await uploadBytes(storageRef, file);
  },
};
