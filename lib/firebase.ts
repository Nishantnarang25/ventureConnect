import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyC4a9mVpVqOejzCvehdkAEQECqU8Q4mE6s",
  authDomain: "ventureconnect-172dd.firebaseapp.com",
  projectId: "ventureconnect-172dd",
  storageBucket: "ventureconnect-172dd.firebasestorage.app",
  messagingSenderId: "871568727429",
  appId: "1:871568727429:web:5c233f21d6491550a3f8ec"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export default app;
