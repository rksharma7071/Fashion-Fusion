import React, { useEffect, useState } from "react";
import { app, db } from "../firebase/Firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const user = useAuth();
  const auth = getAuth(app);
  const navigate = useNavigate();
  const createUser = async (userId) => {
    try {
      await addDoc(collection(db, "users"), {
        uid: userId,
        name: name,
        email: email,
        phone: phone,
        created_at: serverTimestamp(),
      });
      console.log("User document created in Firestore");
    } catch (error) {
      console.error("Error creating user document:", error.message);
    }
  };

  const handleRegistrationForm = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("Register1:", user);

      await createUser(user.uid);
    } catch (error) {
      console.error("Register1", error.message);
    }
  };

  useEffect(()=>{
    if (user) {
      navigate("/");
    }

  }, [user, navigate])
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegistrationForm} method="post">
        <label htmlFor="name">Name</label>
        <input
          type="Name"
          name="Name"
          id="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <br />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <br />
        <br />
        <label htmlFor="phone">Phone</label>
        <input
          type="phone"
          name="phone"
          id="phone"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          required
        />
        <br />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <br />
        <br />
        <button type="submit">Register</button>
        <p>Already have an account? <Link to={'/login'}>Log in here</Link></p>

      </form>
    </div>
  );
}

export default Register;
