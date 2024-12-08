import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/Firebase";
import Logout from "./Logout";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const uid = localStorage.getItem("uid"); // Retrieve UID from local storage

  useEffect(() => {
    if (!uid) {
      navigate("/login"); // Redirect if no UID is found
      return;
    }

    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No user data found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome to your profile!</h1>
      {userData ? (
        <div>
          <h2>User Details:</h2>
          <p>
            <strong>Name:</strong> {userData.name || "Not provided"}
          </p>
          <p>
            <strong>Email:</strong> {userData.email || "Not provided"}
          </p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
      <Logout />
    </div>
  );
}

export default Profile;
