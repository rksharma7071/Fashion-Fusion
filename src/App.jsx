import { Link, Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import Logout from "./components/Logout";

function App() {
  const navigate = useNavigate();
  const user = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }else{
      navigate("/login");
    }
  }, [user, navigate]);


  return (
    <div>
      <h1>Welcome to the App</h1>
      {user ? (
        <>
          <p>Logged in as: {user.email}</p>
          <Logout/>
        </>
      ) : (
        <p>Please log in.<Link to={'/login'}>Login</Link></p>
      )}

      <Outlet />
    </div>
  );
}

export default App;
