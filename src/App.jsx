import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/frontend/Footer";
import Header2 from "./components/frontend/Header2";

function App() {
  return (
    <div>
      <Header2 />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
