import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import Rating from "./Rating";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

export default function Product() {
  const { slug } = useParams();
  const { products, setProducts, cartUpdate, setCartUpdate } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    product["quantity"] = 1;
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Product added successfully!");
    setCartUpdate(!cartUpdate);

  };

  const increment = () => {
    if (product.stock <= quantity) {
      setQuantity(quantity);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const decrement = () => quantity > 1 && setQuantity(quantity - 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsSnapshot = await getDocs(collection(db, "products"));
        const productsArray = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsArray);

        const productData = products.find((product) => product.slug === slug);
        setProduct(productData);

      } catch (e) {
        console.error("Error fetching data: ", e);
      }
    };

    fetchData();
  }, [product]);


  return (
    <div>
      {product ? (
        <>
          <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row items-top lg:items-start">
              {/* Product Image */}
              <div className="w-full lg:w-1/2 p-4">
                <img
                  src={`${product.imageURL}`}
                  alt={product.title}
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="w-full lg:w-1/2 p-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  {product.title}
                </h1>
                <p className="text-gray-600 mt-4">{product.description}</p>

                <Rating />

                <p className="text-xl font-semibold text-green-600 mt-4">
                  ${product.price}
                </p>
                <p className="text-gray-500 mt-2">
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </p>
                <div className="flex items-center space-x-4">
                  {/* Decrement Button */}
                  <button
                    onClick={decrement}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 active:bg-gray-400 transition"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>

                  {/* Quantity Display */}
                  <span className="text-xl font-semibold text-gray-800">
                    {quantity}
                  </span>

                  {/* Increment Button */}
                  <button
                    onClick={increment}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 active:bg-gray-400 transition"
                  >
                    +
                  </button>
                </div>
                {/* Add to Cart Button */}
                <button
                  className="mt-6 px-6 py-3 w-full bg-[#FF9900] hover:bg-[#FF9950] text-white font-semibold rounded-lg  transition duration-200"
                  disabled={product.stock <= 0}
                >
                  Add to Wishlist
                </button>
                <button
                  className="mt-6 px-6 py-3 w-full bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-200"
                  // disabled={product.stock <= 0}
                  onClick={() => handleCart(product)}
                >
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800">
                Product Details
              </h2>
              <p className="text-gray-600 mt-4">
                This gown is made from premium materials to ensure both comfort
                and style. Perfect for weddings, galas, and other formal events.
              </p>
            </div>
          </div>

          {/* <div>
            <h1>{product.title}</h1>
            <img src={`${product.imageURL}`} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
          </div> */}
        </>
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
}
