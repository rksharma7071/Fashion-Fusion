import React, { createContext, useState, useContext, useEffect } from "react";
import { collection, addDoc, getDocs, serverTimestamp, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app, db } from "../firebase/Firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        });
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersArray = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersArray);

        const collectionsSnapshot = await getDocs(collection(db, "collections"));
        const collectionsArray = collectionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCollections(collectionsArray);

        const productsSnapshot = await getDocs(collection(db, "products"));
        const productsArray = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsArray);
        
        console.log("Products: ", products);
        console.log("Collections: ", collections);
        console.log("Products: ", users);
      } catch (e) {
        console.error("Error fetching data: ", e);
      }
    };

    fetchData();
  }, []);


  return (
    <AuthContext.Provider value={{ user, users, setUsers, collections, setCollections, products, setProducts }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
