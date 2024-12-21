import React, { useEffect, useState } from "react";
import { app } from "../../firebase/Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const auth = getAuth(app);
  const { user, users } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("user:", user);
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
      console.log("uid", userId);

      setMessage({
        user: true,
        message: `User Login Successful.`,
      });

      navigate("/");
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
    <div className="p-8">
      <form
        className="max-w-sm mx-auto"
        method="post"
        onSubmit={handleLoginForm}
      >
        <div className="mb-5">
          <h1
            htmlFor="email"
            className="block mb-2 text-2xl text-center text-gray-900"
          >
            Login
          </h1>
          {message && (
            <span style={{ color: message.user ? "green" : "red" }}>
              {message.message}
            </span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter Password"
            required
          />
        </div>
        {/* <div className="flex items-start mb-5 hidden">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div> */}
        <div className="mb-5">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-96 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>

        <div className="text-center">
          <Link to={"/register"} className="text-blue-500 underline">
            Create new account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
