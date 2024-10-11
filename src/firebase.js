 
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword,
     getAuth, 
     signInWithEmailAndPassword,
     signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
 
const firebaseConfig = {
  apiKey: "AIzaSyBbdVk3cHktyddCt-Ju5i1uoTzKT29dxfg",
  authDomain: "netflix-clone-62072.firebaseapp.com",
  projectId: "netflix-clone-62072",
  storageBucket: "netflix-clone-62072.appspot.com",
  messagingSenderId: "632592414035",
  appId: "1:632592414035:web:8100c2c3b0780f134c1da6"
};

 
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db = getFirestore(app)

const signup = async (name, email, password)=>{
    try {
      const res =  await createUserWithEmailAndPassword(auth,email,password);
      const user = res.user;
      await addDoc(collection (db, "user"), {
        uid: user.uid,
        name,
        authProvider:" local",
        email,
      })
    } catch (error) {
        console.log(error);
        alert(error)
          toast.error(error.code.split('/')[1].split('_').join(" "));
    }
}

const login = async(email, password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        alert(error) 
        toast.error(error.code.split('/')[1].split('_').join(" "));
    }
}

const logout =() =>{
    signOut(auth);
}
export {auth, db, login, signup, logout}