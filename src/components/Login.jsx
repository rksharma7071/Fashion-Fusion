import React, { useEffect, useState } from "react";
import { app } from "../firebase/Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const auth = getAuth(app);
  const user = useAuth();  // Get the current user from context
  const navigate = useNavigate();

  // Redirect user if they are already logged in
  useEffect(() => {
    if (user) {
      navigate("/");  // Redirect to home page if the user is logged in
    }
  }, [user, navigate]);

  const handleLoginForm = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      
      setMessage({
        user: true,
        message: `User Login Successful.`,
      });

      navigate("/");  // Redirect to home page after successful login
    } catch (error) {
      console.error("Login error:", error);

      switch (error.code) {
        case "auth/invalid-email":
          setMessage({
            user: false,
            message: "The email address is not valid.",
          });
          break;
        case "auth/user-not-found":
          setMessage({
            user: false,
            message: "No user found with this email.",
          });
          break;
        case "auth/wrong-password":
          setMessage({
            user: false,
            message: "Incorrect password.",
          });
          break;
        case "auth/invalid-credential":
          setMessage({
            user: false,
            message: "Invalid credentials. Check your inputs.",
          });
          break;
        default:
          setMessage({
            user: false,
            message: "An unknown error occurred. Please try again.",
          });
          break;
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {message && (
        <span style={{ color: message.user ? "green" : "red" }}>
          {message.message}
        </span>
      )}
      <form method="post" onSubmit={handleLoginForm}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
