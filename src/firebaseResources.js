import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // TODO: Insert your firebase config information here
  apiKey: "AIzaSyCjAjiZWoKEUBLSxR0OvGG27z2P_EKWnSg",
  authDomain: "meeterz-3398a.firebaseapp.com",
  projectId: "meeterz-3398a",
  storageBucket: "meeterz-3398a.appspot.com",
  messagingSenderId: "219771673726",
  appId: "1:219771673726:web:19d3cb7536e98ea4250c2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
