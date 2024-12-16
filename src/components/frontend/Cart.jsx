import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const Cart = () => {
  const {
    user,
    cartItems,
    setCartItems,
    cart,
    setCart,
    cartUpdate,
    setCartUpdate,
  } = useAuth();

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

  const handleItemRemove = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    let cartGet = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartGet);
    // setCartUpdate(!cartUpdate);
  }, [cartUpdate]);

  return (
    <>
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 border p-4">
          {/* Cart Items */}
          <div className="sm:col-span-4 md:col-span-4 p-6 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between border-b-2 border-gray-300 pb-5 text-2xl sm:text-3xl font-semibold">
              <div>Shipping Cart</div>
              <div>{cart.length} items</div>
            </div>
            <div className="py-4">
              <div className="space-y-4">
                {cart.map((cartItem, index) => (
                  <div
                    className="flex items-center space-x-4 border-b pb-4"
                    key={ index}
                  >
                    <img
                      src={cartItem.imageURL}
                      alt="Product Image"
                      className="w-24 h-24 md:w-32 md:h-32 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                        {cartItem.title}
                      </h2>
                      <p className="text-sm text-gray-500">Leather, Black</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() =>
                            decreaseQuantity(cartItem, cartItem.quantity)
                          }
                          className="text-gray-600 bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="px-4 text-gray-800">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() =>
                            increaseQuantity(cartItem, cartItem.quantity)
                          }
                          className="text-gray-600 bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg md:text-xl font-semibold text-gray-800">
                        ${cartItem.price}
                      </p>
                      <button
                        onClick={() => handleItemRemove(index)}
                        className="text-red-500 text-sm hover:underline mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="sm:col-span-2 md:col-span-2 bg-gray-100 p-6 rounded-lg">
            <div className="text-2xl sm:text-3xl font-semibold border-b-2 border-gray-300 pb-5">
              Order Summary
            </div>
            <div className="mt-6 bg-white shadow rounded-lg p-6 space-y-4">
              <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                <span>Subtotal</span>
                <span>$697.00</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                <span>Shipping</span>
                <span>$20.00</span>
              </div>
              <div className="flex justify-between text-gray-800 font-semibold text-lg sm:text-xl">
                <span>Total</span>
                <span>$717.00</span>
              </div>
              <button className="w-full mt-6 bg-gray-800 text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-900">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="py-56 text-center text-3xl sm:text-4xl uppercase text-gray-700">
          Cart is empty
        </h1>
      )}
    </>
  );
};

export default Cart;
