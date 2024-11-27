import React, { useEffect, useState } from "react";
import { app } from "../firebase/Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const auth = getAuth(app);
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLoginForm = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      setMessage({
        user: true,
        message: `User Login Successful.`,
      });
      localStorage.setItem("uid", userId);

      // navigate("/");
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
    <form className="max-w-sm mx-auto" method="post" onSubmit={handleLoginForm}>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-2xl text-gray-900 dark:text-white">Login</label>
        {message && (
            <span style={{ color: message.user ? "green" : "red" }}>{message.message}</span>
          )}
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
        </div>
        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      
      <div>
        <Link to={'/register'}>Create new account</Link>
      </div>
    </form>
  );
}

export default Login;
