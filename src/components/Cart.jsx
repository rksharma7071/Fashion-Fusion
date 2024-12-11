import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/Firebase";

const Cart = () => {
  const { user, cartItems, setCartItems } = useAuth();
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const decreaseQuantity = (product, quantity) => {
    if (product.quantity < 0) return;
    product.quantity = quantity;
  };
  const increaseQuantity = (product, quantity) => {
    if (product.quantity < 0) return;
  };

  useEffect(() => {
    let cartGet = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartGet);
  }, []);

  return (
    <>
      { cart.length>0 ? <div className="grid grid-cols-6 grid-rows-1 gap-2 border">
        <div className="col-span-4 p-10">
          <div className="flex justify-between border-b-2 border-gray-300 pb-5 text-3xl font-semibold">
            <div>Shipping Cart</div>
            <div>{cart.length} items</div>
          </div>
          <div className="py-4">
            <div className="bg-white shadow rounded-lg p-6 space-y-4">
              {cart.map((cartItem, index) => (
                <div
                  className="flex items-center space-x-4 border-b pb-4"
                  key={index}
                >
                  <img
                    src={cartItem.imageURL}
                    alt="Product Image"
                    className="w-24 h-24 rounded-md"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {cartItem.title}
                    </h2>
                    <p className="text-sm text-gray-500">Leather, Black</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={()=>decreaseQuantity(cartItem, quantity)}
                        className="text-gray-600 bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-4 text-gray-800">{cartItem.quantity}</span>
                      <button
                        onClick={()=>increaseQuantity(cartItem, quantity)}
                        className="text-gray-600 bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-800">
                      ${cartItem.price}
                    </p>
                    <button className="text-red-500 text-sm hover:underline">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2 col-start-5 bg-gray-100">
          <div className="col-span-4 p-10">
            <div className="border-b-2 border-gray-300 pb-5 text-3xl font-semibold">
              <div>Order Summary</div>
            </div>
            <div className="mt-6 bg-white shadow rounded-lg p-6">
              {/* <!-- <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2> --> */}
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>$697.00</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Shipping</span>
                <span>$20.00</span>
              </div>
              <div className="flex justify-between text-gray-800 font-semibold text-lg">
                <span>Total</span>
                <span>$717.00</span>
              </div>
              <button className="w-full mt-6 bg-gray-800 text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-900">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      : 
      <h1 className="py-56  text-center text-3xl uppercase">Cart is empty</h1>
      }
    </>
  );
};

export default Cart;
