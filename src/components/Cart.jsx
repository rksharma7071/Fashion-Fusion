import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/Firebase";

const Cart = () => {
  const { user, cartItems, setCartItems } = useAuth();

  const[cart, setCart] = useState([]);

  if(cartItems[0]){
    // setCart(cartItems[0].items);
    console.log(cartItems[0].items)
    
  }


  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // useEffect(() => {
  //   const fetchCartItems = async () => {
  //     if (user) {
  //       try {
  //         const cartRef = collection(db, "cart");
  //         const cartQuery = query(cartRef, where("userId", "==", user.uid));
  //         const cartSnapshot = await getDocs(cartQuery);

  //         if (!cartSnapshot.empty) {
  //           const cartDoc = cartSnapshot.docs[0];
  //           const cartData = cartDoc.data();
  //           setCartItems(cartData.items);
  //         } else {
  //           console.log("No cart found for this user.");
  //           setCartItems([]);
  //         }
  //       } catch (e) {
  //         console.error("Error fetching cart items: ", e);
  //       }
  //     }
  //   };

  //   console.log(cartItems);
  //   fetchCartItems();
  // }, [user]);

  // console.log(cartItems[0].items)


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">
          Your Shopping Cart
          {/* {cartItems[0].items && cartItems[0].items.length} */}
        </h1>

        <div className="bg-white shadow rounded-lg p-6 max-w-7xl mx-auto">
          {cartItems.length > 0 ? (
            <ul > 
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between py-2">
                  <span>Product ID: {item.productId}</span>
                  <span>Quantity: {item.quantity}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center border-b border-gray-200 py-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-500">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                      +
                    </button>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-bold">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>

        <div className="mt-6 bg-white shadow rounded-lg p-6  max-w-7xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between border-b border-gray-200 pb-4">
            <span>Subtotal</span>
            <span>${getTotal()}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-4">
            <span>Shipping</span>
            <span>$10</span>
          </div>
          <div className="flex justify-between text-xl font-bold py-4">
            <span>Total</span>
            <span>${getTotal() + 10}</span>
          </div>
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4 hover:bg-blue-600">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
