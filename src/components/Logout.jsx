import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
