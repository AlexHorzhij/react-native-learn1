import { v4 } from 'uuid';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// import { ref:refDb, set } from 'firebase/database';
import { auth, storage, db } from '../fireBase/firebaseConfig';

const DEFAULT_AVATAR =
  'https://firebasestorage.googleapis.com/v0/b/react-native-learn1-3adc9.appspot.com/o/image%2Favatars%2Fblank-profile-default.png?alt=media&token=c83f14f3-10a4-47e8-880e-0317e139a8c0';

export default {
  // ============= Auth ==========================
  async userSignUp({ name, email, password }) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: DEFAULT_AVATAR,
      });

      const data = await auth.currentUser;
      console.log(data);
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
  async updateUserData(data) {
    await updateProfile(auth.currentUser, {
      photoURL: data.photoURL ? data.photoURL : DEFAULT_AVATAR,
    });

    const user = auth.currentUser;

    const { displayName, email, uid, photoURL } = user;
    return { displayName, email, uid, photoURL };
  },
  // ===================== Posts ====================
  async uploadPostAtServer(data) {
    console.log('data123: ', data);
    console.log('db: ', db);
    try {
      await addDoc(collection(db, 'posts'), data);
      const querySnapshot = await getDocs(collection(db, 'posts'));
      console.log('Document written with ID: ', querySnapshot);
      const posts = [];
      querySnapshot.forEach(doc => {
        const postItem = { ...doc.data(), postId: doc.id };
        posts.push(postItem);
        console.log(posts);
        // console.log(`${doc.id} => ${doc.data()}`);
      });
      return posts;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  },
  async getAllPosts() {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    // console.log('Document written with ID: ', querySnapshot);
    const posts = [];
    querySnapshot.forEach(doc => {
      const postItem = { ...doc.data(), postId: doc.id };
      posts.push(postItem);
      // console.log(`${doc.id} => ${doc.data()}`);
    });
    console.log(posts);
    return posts;
  },
  async saveInStorage(file) {
    const name = v4();
    const storageRef = ref(storage, `image/${name}`);

    const foto = await uploadBytes(storageRef, file);
  },
};
