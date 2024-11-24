import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMB2nyZltKTl2vluC98aSZ8OwqyfNKIGk",
  authDomain: "fashion-fusion-94cf8.firebaseapp.com",
  projectId: "fashion-fusion-94cf8",
  storageBucket: "fashion-fusion-94cf8.firebasestorage.app",
  messagingSenderId: "979550679252",
  appId: "1:979550679252:web:385d30ec49a4eec4f9cb41",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
