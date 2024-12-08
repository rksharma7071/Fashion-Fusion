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
import AllProducts from "./components/AllProducts.jsx";
import Product from "./components/Product.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products",
          element: <AllProducts />,
        },
        {
          path: "/product/:slug",
          element: <Product />,
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

    {
      path: "/",
      element: <Base />,
      children: [
        {
          path: "/admin/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/admin/products",
          element: <Products />,
        },
        {
          path: "/admin/collections",
          element: <Collections />,
        },
        {
          path: "/admin/customers",
          element: <Customers />,
        },
        {
          path: "/admin/orders",
          element: <Orders />,
        },
        {
          path: "/admin/profile",
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
