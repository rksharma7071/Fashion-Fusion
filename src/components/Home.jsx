import React from "react";
import { useAuth } from "../context/AuthContext";
import Logout from "./Logout";

function Home() {
  const user = useAuth();

  return (
    <div class="max-w-lg mx-auto mt-20">
      <h1>Welcome to the Home Page</h1>
      {user ? (
        <>
          <p>User ID: {user.uid}</p>
          <Logout />
        </>
      ) : (
        <p>No user is logged in.</p>
      )}
    </div>
  );
}

export default Home;
