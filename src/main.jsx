import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./components/Products.jsx";
import Home from "./components/Home";
import AddProducts from './components/AddProducts.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import Variants from './components/variants.jsx';
import ProductForm from './components/ProductForm.jsx';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Home /> },
        { path: "products", element: <Products /> },
      ],
    },
    { path: "/signin", element: <SignIn/> },
    { path: "/signup", element: <SignUp/> },
    { path: "/addproduct", element: <AddProducts/> },
    { path: "/variants", element: <Variants/> },
    { path: "/product-form", element: <ProductForm/> },
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

createRoot(document.getElementById('root')).render(
  <RouterProvider future={{ v7_startTransition: true }} router={router} />
);


