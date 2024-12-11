import React from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/Firebase.jsx";

function ProductCard({ product }) {
  const { user, setUser } = useAuth();

  // const createCart = async (userId, productId) => {
  //   try {
  //     const cartRef = collection(db, "cart");

  //     const cartQuery = query(cartRef, where("userId", "==", userId));
  //     const cartSnapshot = await getDocs(cartQuery);

  //     if (!cartSnapshot.empty) {
  //       const cartDoc = cartSnapshot.docs[0];
  //       const cartData = cartDoc.data();

  //       const existingItemIndex = cartData.items.findIndex(
  //         (item) => item.productId === productId
  //       );

  //       if (existingItemIndex !== -1) {
  //         cartData.items[existingItemIndex].quantity += 1;
  //       } else {
  //         cartData.items.push({
  //           productId: productId,
  //           quantity: 1,
  //         });
  //       }

  //       await updateDoc(doc(db, "cart", cartDoc.id), { items: cartData.items });
  //     } else {
  //       await addDoc(cartRef, {
  //         userId: userId,
  //         items: [
  //           {
  //             productId: productId,
  //             quantity: 1,
  //           },
  //         ],
  //       });
  //     }
  //     console.log("Cart updated successfully!");
  //   } catch (e) {
  //     console.error("Error updating cart: ", e);
  //   }
  // };

  // const handleCart = () => {
  //   console.log(user);
  //   createCart(user.uid, product.id, 1);
  // };

  const handleCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    product["quantity"] = 1;
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Product added successfully!");
  };

  return (
    <div
      style={{ height: "500px" }}
      className="relative flex aspect-square w-full flex-col overflow-hidden rounded-lg bg-white shadow-md"
    >
      <Link
        className="relative flex  overflow-hidden rounded-xl "
        to={`/product/${product.slug}`}
      >
        <img
          className="object-cover w-full"
          // src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          src={product.imageURL}
          alt="product image"
        />
        <span className="absolute top-0 right-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          <FaRegHeart />
        </span>
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          39% OFF
        </span>
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link to={`/product/${product.slug}`}>
          <h5 className="text-xl tracking-tight text-slate-900">
            {product.title}
          </h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              ${product.price}
            </span>
            <span className="text-sm text-slate-900 line-through">
              ${Number(product.price) + 60}
            </span>
          </p>
        </div>
        <div className="flex items-center">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
            5.0
          </span>
        </div>
        <div
          onClick={() => handleCart(product)}
          className="flex items-center justify-center mt-4 px-5 py-2.5 text-center text-sm font-medium rounded-md border text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 hover:cursor-pointer focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
