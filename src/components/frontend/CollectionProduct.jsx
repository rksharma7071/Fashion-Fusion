import React, { useContext } from "react";
import ProductCard from "../ProductCard";
import { useAuth } from "../../context/AuthContext";

function  CollectionProduct() {
  const { products, setProducts, collections, generateSlug, search } = useAuth();

  return (
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:col-8 gap-4 mx-auto max-w-7xl">
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
  );
}

export default CollectionProduct;
