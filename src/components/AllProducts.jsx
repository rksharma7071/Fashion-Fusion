import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { useAuth } from "../context/AuthContext";

function AllProducts() {
  const { products, setProducts, collections, generateSlug, search } =
    useAuth();

  // console.log(products);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:col-8 gap-4 p-5">
      {products
        .filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((product, index) => (
          <div className="" key={index} >
            <ProductCard product={product} />
          </div>
        ))}
    </div>
  );
}

export default AllProducts;
