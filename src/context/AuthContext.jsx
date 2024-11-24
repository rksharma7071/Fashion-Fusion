import React, { createContext, useState, useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/Firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
