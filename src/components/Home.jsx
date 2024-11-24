import React from "react";
import { useAuth } from "../context/AuthContext";

function Home() {
  const user = useAuth();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {user ? <p>User ID: {user.uid}</p> : <p>No user is logged in.</p>}
    </div>
  );
}

export default Home;
