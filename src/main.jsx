import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/frontend/Register.jsx";
import Login from "./components/frontend/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./components/frontend/Home.jsx";
import Profile from "./components/Profile.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Base from "./components/Base.jsx";
import Products from "./components/Products.jsx";
import Customers from "./components/Customers.jsx";
import CollectionsBack from "./components/Collections.jsx";
import Orders from "./components/Orders.jsx";
import Collections from "./components/frontend/Collections.jsx";
import AllProducts from "./components/frontend/AllProducts.jsx";
import Product from "./components/frontend/Product.jsx";
import Cart from "./components/frontend/Cart.jsx";
import Account from "./components/frontend/Account.jsx";
import Error404 from "./components/frontend/Error404.jsx";
import Contact from "./components/frontend/Contact.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      // errorElement:<Error404/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/collections",
          element: <Collections />,
        },
        {
          path: "/products",
          element: <AllProducts />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/product/:slug",
          element: <Product />,
        },
        {
          path: "/account",
          element: <Account/>
        },
        {
          path: "/contact",
          element: <Contact />,
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
      // errorElement:<Error404/>,
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
          element: <CollectionsBack />,
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
