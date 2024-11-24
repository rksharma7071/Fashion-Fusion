import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./components/Home.jsx";
import Profile from "./components/Profile.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path:'/register',
          element:<Register/>,
        },
        {
          path:'/login',
          element:<Login/>,
        },
        {
          path:'/profile',
          element:<Profile/>,
        },
      ]
    },
    {
      path:'/home',
      element:<Home/>
    }
    
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider future={{ v7_startTransition: true }} router={router} />
  </AuthProvider>
);
