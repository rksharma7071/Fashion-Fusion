import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { useAuth } from "../context/AuthContext";

function AllProducts() {
  const { products, setProducts, collections, generateSlug } = useAuth();

  console.log(products);
  return (
    <div className="flex justify-evenly gap-5 p-5 flex-wrap">
      {products.map((product) => (
        <>
        <ProductCard />
        <ProductCard />
        </>
      ))}
    </div>
  );
}

export default AllProducts;
