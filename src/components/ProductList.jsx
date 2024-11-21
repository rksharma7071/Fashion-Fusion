import React from "react";

function ProductList({products}) {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Product List
      </h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200 shadow-sm bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Variants</th>
              <th className="border border-gray-300 px-4 py-2">Tags</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={index % 2 === 0 ? "bg-gray-50" : ""}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {product.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ₹{product.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.category?.join(", ")}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.variants && Object.keys(product.variants).length > 0 ? (
                    <div className="space-y-2">
                      {Object.entries(product.variants).map(([variantName, values]) => (
                        <div key={variantName} className="bg-gray-100 p-2 rounded-md">
                          <h4 className="font-semibold text-gray-700 text-sm">
                            {variantName}:
                          </h4>
                          <ul className="list-disc list-inside text-gray-600 text-sm">
                            {values.map((value, index) => (
                              <li key={index}>{value}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">No variants available</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.tags?.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList;
