import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./components/Home.jsx";
import Profile from "./components/Profile.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Base from "./components/Base.jsx";
import Products from "./components/Products.jsx";
import Customers from "./components/Customers.jsx";
import Orders from "./components/Orders.jsx";
import Collections from "./components/Collections.jsx";

const router = createBrowserRouter(
  [
    // Customer-facing routes
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },

    // Admin routes
    {
      path: "/",
      element: <Base />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/collections",
          element: <Collections />,
        },
        {
          path: "/customers",
          element: <Customers />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
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
