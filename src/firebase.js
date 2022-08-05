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
    updateDoc,
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
        orgs: []
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
// Return: array of dates that equal the array of input dates
const getUserScheduleForOrg = async (userId, orgName, days) => {
  const myDeats = []

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

// Gets user's availability for org
// Params: orgName = name of organization, userId = user's id
// Return: array of dates indexed 0-6 for days of week, (0 = Sunday)
const getUserAvailabilityForOrg = async (userId, orgName) => {
  const availability = []

  try {
      const q = query(collection(db, orgName), where("uid", "==", userId));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      availability = data.availability
      return availability
      } catch (error) {
      console.log(error)
  }
}

// Get organizations that user belongs to
// Params: userId = user's id
// Return: array of org names
const getOrgsForUser = async (userId) => {
  const orgs = []

  try {
      const q = query(collection(db, 'users'), where("uid", "==", userId));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      orgs = data.orgs
      return orgs
      } catch (error) {
      console.log(error)
  }
}

// Get user's role
// Params: orgName = name of organization, userId = user's id
// Return: String : user's role
const getUserRoleFromOrg = async (userId, orgName) => {
  let role = ''

  try {
      const q = query(collection(db, orgName), where("uid", "==", userId));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      role = data.role
      return role
      } catch (error) {
      console.log(error)
  }
}

// Creates a new organization in the database
// Params: orgName = name of organization, userId = user's id (this will be the owner of the org)
// Return: boolean : whether create succeeded
const createNewOrg = async (userId, orgName) => {

  try {
    const q = query(collection(db, orgName));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, orgName), {
        uid: userId,
        role: 'owner',
        availability: [],
        schedule: [],
      });
    } else {
      return false
    }
    return true
      } catch (error) {
      console.log(error)
      return false
  }
}

// Updates user's availability in org
// Params: orgName = name of organization, userId = user's id, newAvailability = the user's new available schedule
// Return: boolean : whether update succeeded
const updateAvailabilityForUserInOrg = async (userId, orgName, newAvailability) => {

  try {
    const q = query(collection(db, orgName), where("uid", "==", userId));
    const doc = await getDocs(q);
    const docId = doc.docs[0].id
    const docRef = doc(db, orgName, docId)
    
    await updateDoc(docRef, {
      'availability': newAvailability
    })

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export {
    auth,
    db,
    signInWithGoogle,
    logout,
    getUserScheduleForOrg,
    getUserAvailabilityForOrg,
    getUserRoleFromOrg,
    getOrgsForUser,
    updateAvailabilityForUserInOrg,
    createNewOrg,
    
}
