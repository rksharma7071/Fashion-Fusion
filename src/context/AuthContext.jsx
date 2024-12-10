import React, { createContext, useState, useContext, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { app, db } from "../firebase/Firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        });
        // console.log("user: ", user.uid, "email: ", user.email);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  function generateSlug(name) {
    const sanitizedName = name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-");
    return sanitizedName;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersArray = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersArray);

        const cartSnapshot = await getDocs(collection(db, "cart"));
        const cartArray = cartSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(cartArray);

        const collectionsSnapshot = await getDocs(
          collection(db, "collections")
        );
        const collectionsArray = collectionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCollections(collectionsArray);

        const productsSnapshot = await getDocs(collection(db, "products"));
        const productsArray = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsArray);

        if (user) {
          try {
            const cartRef = collection(db, "cart");
            const cartQuery = query(cartRef, where("userId", "==", user.uid));
            const cartSnapshot = await getDocs(cartQuery);

            if (!cartSnapshot.empty) {
              const cartDoc = cartSnapshot.docs[0];
              const cartData = cartDoc.data();
              setCartItems(cartData.items);
            } else {
              console.log("No cart found for this user.");
              setCartItems([]);
            }
          } catch (e) {
            console.error("Error fetching cart items: ", e);
          }
        }

        // console.log("Products: ", products);
        // console.log("Collections: ", collections);
        // console.log("Users: ", users);
      } catch (e) {
        console.error("Error fetching data: ", e);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        setUser,
        setUsers,
        collections,
        setCollections,
        products,
        setProducts,
        generateSlug,
        search,
        setSearch,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
