// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3apaxLj4OMQ_LS-851E28DesoAXdNyTY",
  authDomain: "firegram-c6251.firebaseapp.com",
  projectId: "firegram-c6251",
  storageBucket: "firegram-c6251.appspot.com",
  messagingSenderId: "804255482368",
  appId: "1:804255482368:web:77e19eb637f19be0f9cee5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(app);
const projectStorage = getStorage(app);

export { projectFirestore, projectStorage };