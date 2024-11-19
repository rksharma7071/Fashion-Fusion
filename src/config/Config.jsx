import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCAPctqAxsT4rWVyhTFPJSBZfIkJk-AqEU",
  authDomain: "fashion-fusion-86139.firebaseapp.com",
  projectId: "fashion-fusion-86139",
  storageBucket: "fashion-fusion-86139.appspot.com",
  messagingSenderId: "161453724521",
  appId: "1:161453724521:web:472358aa68e535f65da3f8",
  measurementId: "G-T3H6R69M3W",
};

const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const db = getFirestore(app);


export { app };