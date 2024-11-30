import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header2 from "./components/Header2";
import FlowbiteJS from "flowbite/dist/flowbite.js"
import "flowbite/dist/flowbite.css"

function App() {
  return (
    <div>
      <FlowbiteJS/>
      {/* <FlowbiteCSS/> */}
      <Header2 />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
