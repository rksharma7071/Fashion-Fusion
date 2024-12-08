import React from "react";
import { useAuth } from "../context/AuthContext";
import Logout from "./Logout";
import AllProducts from "./AllProducts";

function Home() {
  const { user } = useAuth();

  return (
    <>
      <div className="max-w-lg mx-auto mt-20">
        <h1>Welcome to the Home Page</h1>
        {user ? (
          <>
            <p>
              User ID: <strong>{user.uid}</strong>
            </p>
            <p>
              User Email: <strong>{user.email}</strong>
            </p>
            <Logout />
          </>
        ) : (
          <p>No user is logged in.</p>
        )}
      </div>
      <AllProducts />
    </>
  );
}

export default Home;
