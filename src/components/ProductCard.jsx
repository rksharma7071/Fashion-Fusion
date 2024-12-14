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
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import Rating from "./frontend/Rating.jsx";


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
      // style={{ height: "500px" }}
      className="relative flex w-full flex-col bg-white border"
    >
      <Link to={`/product/${product.slug}`} className="relative flex overflow-hidden">
        <img
          className="object-cover w-full aspect-square"
          src={product.imageURL}
          alt="product image"
        />
        <button className="absolute top-0 right-0 m-2 rounded-full flex justify-center items-center bg-gray-300 text-center text-sm font-medium text-white w-6 h-6 aspect-w-1 aspect-h-1">
          <FaRegHeart />
        </button>
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          39% OFF
        </span>
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link to={`/product/${product.slug}`}>
          <h5 className=" text-base tracking-tight text-slate-900">
            {product.title}
          </h5>
        </Link>
        <div className="mt-2 mb-2 flex items-center justify-between">
          <p>
            <span className="text-2xl font-bold text-slate-900">
              ${product.price}
            </span>
            <span className="text-sm text-slate-900 line-through text-gray-500">
              ${Number(product.price) + 60}
            </span>
          </p>
        </div>
        <Rating/>
        
        <div
          onClick={() => handleCart(product)}
          className="flex items-center justify-center mt-4 px-5 py-2.5 hidden text-center text-sm font-medium border text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 hover:cursor-pointer focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
