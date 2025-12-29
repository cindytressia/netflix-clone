import { initializeApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"
import {
  addDoc,
  collection,
  getFirestore
} from "firebase/firestore"
import { toast } from "react-toastify"

const firebaseConfig = {
  apiKey: "AIzaSyBCPDBWNmmtW-3vCHoEqIlprvJ4DYZ6rV0",
  authDomain: "netflix-clone-ea6b4.firebaseapp.com",
  projectId: "netflix-clone-ea6b4",
  storageBucket: "netflix-clone-ea6b4.appspot.com",
  messagingSenderId: "840652641186",
  appId: "1:840652641186:web:7bcfb2f3e573fe5d91d8fb"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)


export const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)

    await addDoc(collection(db, "users"), {
      uid: res.user.uid,
      name,
      email,
      authProvider: "local"
    })

    return res
  } catch (error) {
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}


const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res
  } catch (error) {
    toast.error(error.code.split('/')[1].split('-').join(" "));
    
  }
}


export const logout = async () => {
  await signOut(auth)
}
