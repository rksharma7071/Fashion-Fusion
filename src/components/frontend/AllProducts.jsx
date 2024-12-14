import React, { useContext } from "react";
import ProductCard from "../ProductCard";
import { useAuth } from "../../context/AuthContext";

function AllProducts({title}) {
  const { products, setProducts, collections, generateSlug, search } =
    useAuth();

  // console.log(products);
  return (
    
    <div>
      {title && 
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 text-2xl font-semibold">
        <h2 className=" ">{title}</h2>
      </div>
      }
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:col-8 gap-4 p-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
