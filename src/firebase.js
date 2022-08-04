import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
 } from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC0_kO-4pJ8A5aEiqpzm_SFDvkeHGNpzV4",
    authDomain: "schedule-manager-a17f2.firebaseapp.com",
    projectId: "schedule-manager-a17f2",
    storageBucket: "schedule-manager-a17f2.appspot.com",
    messagingSenderId: "787199070113",
    appId: "1:787199070113:web:19fa53fb81d734282885e0",
    measurementId: "G-LRVW8788VB"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        photo: user.photoURL,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = async () => {
  signOut(auth);
};

// Database functions

// Gets user's schedule for org
// Params: orgName = name of organization, days = array of days of current week, userId = user's id
const getUserScheduleForOrg = async (userId, orgName, days) => {
  const myDeats =[]

  try {
      const q = query(collection(db, orgName), where("uid", "==", userId));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      days.forEach((item1, index) => {
          const result = data.schedule.find(item => 
              (new Date(item.timeStart.seconds * 1000).getDate() === item1.getDate())
              && (new Date(item.timeStart.seconds * 1000).getMonth() === item1.getMonth())
              && (new Date(item.timeStart.seconds * 1000).getFullYear() === item1.getFullYear()))
          myDeats.push(result)
      })
      return myDeats
      } catch (error) {
      console.log(error)
  }
}

export {
    auth,
    db,
    signInWithGoogle,
    logout,
    getUserScheduleForOrg,
}
