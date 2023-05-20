import { v4 } from 'uuid';
import { auth, storage, db } from '../fireBase/firebaseConfig';
import { ref, uploadBytes } from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

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

      await auth.currentUser;
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
    try {
      await addDoc(collection(db, 'posts'), data);
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const posts = [];
      querySnapshot.forEach(doc => {
        const postItem = { ...doc.data(), postId: doc.id };
        posts.push(postItem);
      });
      return posts;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  },
  async getAllPosts() {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const posts = [];
    querySnapshot.forEach(doc => {
      const postItem = { ...doc.data(), postId: doc.id };
      posts.push(postItem);
    });
    return posts;
  },
  async saveInStorage(file) {
    const name = v4();
    const storageRef = ref(storage, `image/${name}`);
    await uploadBytes(storageRef, file);
  },
  async updateLikePost({ userId, postId, liked }) {
    const postRef = doc(db, 'posts', postId);

    try {
      if (liked) {
        await updateDoc(postRef, {
          likes: arrayUnion(userId),
        });
      } else {
        await updateDoc(postRef, {
          likes: arrayRemove(userId),
        });
      }
      const docSnap = await getDoc(postRef);

      if (docSnap.exists()) {
        const res = docSnap.data();
        return { likes: res.likes, postId, userId };
      } else {
        return null;
      }
    } catch (error) {
      console.log('error: ', error);
    }
  },
  async addComment({ data, postId }) {
    const postRef = doc(db, 'posts', postId);

    try {
      await updateDoc(postRef, { comments: arrayUnion(data) });
      const docSnap = await getDoc(postRef);
      if (docSnap.exists()) {
        const res = docSnap.data();
        return { comments: res.comments, postId };
      } else {
        return null;
      }
    } catch (error) {
      console.log('error: ', error);
    }
  },
};
