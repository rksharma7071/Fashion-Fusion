import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const user = useAuth();

  useEffect(() => {
    if (user) {
      // navigate("/profile");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <div>
      Profile
      <h1>Welcome to the {user ? user.email : ""}</h1>
      {user ? (
        <>
          <Logout />
        </>
      ) : (
        <p>
          Please log in.<Link to={"/login"}>Login</Link>
        </p>
      )}
    </div>
  );
}

export default Profile;
